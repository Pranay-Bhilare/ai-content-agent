import { currentUser } from "@clerk/nextjs/server";
import {Innertube} from "youtubei.js";
import { TranscriptEntry } from "@/types/types";

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
    console.log(`🎯 getVideoTranscripts called for video: ${videoId}`);
    const user = currentUser();
    if(!user) {
        console.error(" User authentication failed");
        throw new Error("User not found");
    }
    console.log(" User authenticated");
    
    try {
        const transcript = await fetchTranscript(videoId);
        console.log("📤 Returning transcript data with length:", transcript.length);
        return {
            transcript: transcript,
            cache: "This is not cached"
        };
    } catch (error) {
        console.error("Error getting transcripts:", error);
        throw error;
    }
}