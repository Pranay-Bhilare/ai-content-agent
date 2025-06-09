import imageGeneration from "@/actions/imageGeneration";
import { tool } from "ai";
import {z} from "zod"

const generateImage = tool({
    description : "Generate an image",
    parameters : z.object({
        prompt : z.string().describe("The prompt to generate an image for"),
        videoId : z.string().describe("The video ID to fetch the trascript for")
    }),
    execute : async ( { prompt,videoId  }) => {
        const image = await imageGeneration(prompt, videoId);
        return{
            image
        }
    }
}) 

export default generateImage;