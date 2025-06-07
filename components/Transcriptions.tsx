"use client"
import { TranscriptEntry } from "@/types/types";
import { useState } from "react";

export default function Transcription(videoId:{videoId: string}) {
    const [transcript, setTranscript] = useState<{transcription : TranscriptEntry, cache : string} | null>(null);
    return (
        <div className="rounded-xl flex flex-col p-4 border">
            <div className="min-w-52">
                Transcription
            </div>
            <div className="flex flex-col gap-2 max-h-[1250px] overflow-y-auto rounded-md p-4">
                {transcript ? (
                    transcript.transcript.map((entry, index) => (
                    <div key={index} className="flex gap-2">
                        <span className="text-sm text-gray-400 min-w-[50px]">
                        {entry.timestamp}
                        </span>
                        <p className="text-sm text-gray-780">{entry.text}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-se text-gray-588">No transcription available</p>
                )}
            </div>


        </div>
    )
}