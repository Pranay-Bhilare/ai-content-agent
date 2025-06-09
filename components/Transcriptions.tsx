"use client"
import { getVideoTranscripts } from "@/actions/getYoutubeVideoTranscript";
import { TranscriptEntry } from "@/types/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

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
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-semibold text-white">Transcription</h2>
                </div>
                {!isLoading && transcriptData?.cache && (
                    <p className="text-xs text-white/40">{transcriptData.cache}</p>
                )}
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-8"
                    >
                        <div className="text-white/80 animate-pulse">Loading transcript...</div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-center py-8"
                    >
                        {error}
                    </motion.div>
                ) : transcriptData && transcriptData.transcript.length > 0 ? (
                    <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                        {transcriptData.transcript.map((entry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.03 }}
                                className="flex gap-4 items-start group"
                            >
                                <span className="text-sm font-mono text-indigo-400 min-w-[50px] pt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {entry.timestamp}
                                </span>
                                <p className="text-sm text-white/80 leading-relaxed group-hover:text-white transition-colors">
                                    {entry.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-8 px-4 rounded-lg mt-4 border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <p className="text-white/80">No transcription available for this video</p>
                        <p className="text-sm text-white/60 mt-1">
                            Generate a transcript to see it appear here
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}