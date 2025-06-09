"use server"

import { google } from "googleapis"
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
    version : "v3",
    auth: process.env.YOUTUBE_API_KEY
})
export async function getVideoDetails( videoId :string) : Promise<VideoDetails | null>{
    console.log("Fetching video details for :", videoId);
    try { 
        const videoRepsonse = youtube.videos.list({
            part: ["statistics","snippet"],
            id : [videoId]
        })

        const videoDetails = (await videoRepsonse).data.items?.[0];
        
        if(!videoDetails) throw new Error ("Video not found");

        const channelRepsonse = youtube.channels.list({
            part: ["statistics","snippet"],
            id : [videoDetails.snippet?.channelId || ""],
            key: process.env.YOUTUBE_API_KEY
        })

        const channelDetails = (await channelRepsonse).data.items?.[0];

        const video: VideoDetails = {
            // Video Info
            title : videoDetails.snippet?.title || "Unknown Title",
            thumbnail : videoDetails.snippet?.thumbnails?.maxres?.url ||
                        videoDetails.snippet?.thumbnails?.high?.url ||
                        videoDetails.snippet?.thumbnails?.default?.url ||
                        "",
            publishedAt : videoDetails.snippet?.publishedAt || new Date().toISOString(),
            // Video metrics
            views : videoDetails.statistics?.viewCount || "0",
            comments : videoDetails.statistics?.commentCount || "Not available",
            likes : videoDetails.statistics?.likeCount || "Not available",

            channel : {
                title : channelDetails?.snippet?.title || "Unknown channel",
                thumbnail : channelDetails?.snippet?.thumbnails?.default?.url || "",
                subscribers : channelDetails?.statistics?.subscriberCount || "0"
            }
        }
        console.log("video details fetched successfully");
        return video
    }
    catch(error){
        console.error("Error fetching the video details : ", error);
        return null;
    }
}