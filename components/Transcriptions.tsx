"use client"
import { getVideoTranscripts } from "@/actions/getYoutubeVideoTranscript";
import { TranscriptEntry } from "@/types/types";
import { useEffect, useState } from "react";

// Define a more specific type for the component's props
interface TranscriptionProps {
    videoId: string;
}

// Define a type for the transcript data structure
type TranscriptData = {
    transcript: TranscriptEntry[];
    cache: string;
};

export default function Transcription({ videoId }: TranscriptionProps) {
    const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!videoId) {
            setIsLoading(false);
            return;
        }

        const fetchTranscript = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getVideoTranscripts(videoId);
                setTranscriptData(result);
            } catch (e) {
                console.error("Failed to fetch transcript:", e);
                setError("Could not load the transcript.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTranscript();
    }, [videoId]);

    return (
        <div className="rounded-xl flex flex-col border bg-gray-50 shadow-sm">
            <div className="p-4 border-b bg-white rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-800">Transcription</h2>
                {!isLoading && transcriptData?.cache && (
                    <p className="text-xs text-gray-400 mt-1">{transcriptData.cache}</p>
                )}
            </div>
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-4">
                {isLoading ? (
                    <p className="text-sm text-gray-500">Loading transcript...</p>
                ) : error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : transcriptData && transcriptData.transcript.length > 0 ? (
                    transcriptData.transcript.map((entry, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <span className="text-sm font-mono text-blue-600 min-w-[50px] pt-0.5">
                                {entry.timestamp}
                            </span>
                            <p className="text-sm text-gray-700 leading-relaxed">{entry.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No transcription available for this video.</p>
                )}
            </div>
        </div>
    );
}