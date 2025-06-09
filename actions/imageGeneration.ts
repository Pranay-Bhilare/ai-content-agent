" use server "
import { api } from '@/convex/_generated/api';
import { google } from '@ai-sdk/google';
import { currentUser } from '@clerk/nextjs/server';
import { generateText } from 'ai';
import { ConvexHttpClient } from 'convex/browser';
import * as fs from 'node:fs';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function imageGeneration(prompt: string, videoId: string) {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    const result = await generateText({
        model: google('gemini-2.0-flash-exp'),
        providerOptions: {
            google: { responseModalities: ['TEXT','IMAGE'] },
        },
        prompt: prompt,
    });

    // Extract the first image file
    const imageFile = result.files.find(file => file.mimeType.startsWith('image/'));
    if (!imageFile) {
        throw new Error('No image generated');
    }

    // Get the base64 string of the image
    const base64Image = imageFile.base64;
    console.log("Base64 Image Data (first 100 chars):", base64Image.substring(0, 100));

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Image, 'base64');

    // Save the image as a PNG file
    const filePath = `/tmp/generated-image.png`;
    fs.writeFileSync(filePath, buffer);
    console.log("Image saved as generated-image.png");

    // Prepare the image data for upload
    const postUrl = await convex.mutation(api.images.generateUploadUrl);
    const postResult = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: buffer
    });

    const { storageId } = await postResult.json();

    // Store the image metadata in the database
    await convex.mutation(api.images.storeImage, {
        storageId: storageId,
        videoId,
        userId: user.id
    });

    return {
        storageId
    };
}
