import { currentUser } from "@clerk/nextjs/server";
import {Innertube} from "youtubei.js";
import { TranscriptEntry } from "@/types/types";
import { ConvexHttpClient } from "convex/browser";
import {api} from "@/convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function formatTimestamp(start_ms : number) {
    const minutes = Math.floor(start_ms/60000);
    const seconds = Math.floor((start_ms % 60000)/1000);
    return `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
    console.log(` Fetching transcript for video: ${videoId}`);
    try {
        // 1. Initialize Innertube properly
        console.log(" Creating YouTube instance...");
        const yt = await Innertube.create({
            lang: "en",
            location: "US",
            retrieve_player: false,
            generate_session_locally: true
        });
        console.log(" YouTube instance created");

        // 2. Use Android client to avoid parser issues
        console.log(" Fetching video info...");
        const info = await yt.getInfo(videoId, 'ANDROID');
        console.log("Video info fetched");

        // 4. Get transcript data
        console.log(" Retrieving transcript data...");
        const transcriptData = await info.getTranscript();
        console.log("Raw transcript data retrieved");
        
        console.log("Processing transcript segments...");
        const transcript = transcriptData.transcript.content?.body?.initial_segments.map((s) => ({
            text: s.snippet.text ?? "",
            timestamp: formatTimestamp(Number(s.start_ms))
        })) || [];
        console.log(` Processed ${transcript.length} transcript segments`);
        console.log(transcript);
        return transcript;
    } catch (error) {
        console.error("Error in fetchTranscript:", error);
        throw error;
    }
}

export async function getVideoTranscripts(videoId: string) {
    console.log(` getVideoTranscripts called for video: ${videoId}`);
    const user = await currentUser();
    if(!user) {
        console.error(" User authentication failed");
        throw new Error("User not found");
    }
    console.log(" User authenticated");
    
    const existingTranscript = await convex.query(
                                    api.transcript.getTranscriptByVideoId,
                                    {videoId : videoId, userId : user.id})
    
    if(!existingTranscript){
        console.log("Transcript not found in the database.")
    }
    if(existingTranscript){
        console.log("Transcript found in database");
        return {
            transcript : existingTranscript.transcript,
            cache : "This video has already been transcribed once - Accessing transcribed cached one instead of redoing it and using a token"
        }
    }
        try {
            const transcript = await fetchTranscript(videoId);
            console.log("Storing in the database ----");
            await convex.mutation(api.transcript.storeTranscript,{
                userId : user.id,
                videoId : videoId,
                transcript : transcript
            })

            console.log(" Returning transcript data with length:", transcript.length);
            return {
                transcript: transcript,
                cache: "This is transcribed for the first time, the transcript is now saved in the database"
            };
        }
    catch(error){
        console.error("Error fetching the transcripts : ", error);
        return {
            transcript : [],
            cache : "TError fetching the transcripts, please try again."
        };
    }
}