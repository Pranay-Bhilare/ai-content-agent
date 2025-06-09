'use client';

import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Import components with dynamic imports
const AiAgentChat = dynamic(() => import("@/components/AiAgentChat"), { ssr: false });
const ThumbnailGeneration = dynamic(() => import("@/components/ThumbnailGeneration"), { ssr: false });
const TitleGeneration = dynamic(() => import("@/components/TitleGeneration"), { ssr: false });
const Transcription = dynamic(() => import("@/components/Transcriptions"), { ssr: false });
const YoutubeVideoDetails = dynamic(() => import("@/components/YoutubeVideoDetails"), { ssr: false });
const SpaceScene = dynamic(() => import("@/components/ui/SpaceScene"), { ssr: false });
const HolographicCard = dynamic(() => import("@/components/ui/HolographicCard").then(mod => mod.HolographicCard), { ssr: false });

interface AnalysisPageClientProps {
    videoId: string;
}

export default function AnalysisPageClient({ videoId }: AnalysisPageClientProps) {
    return (
        <div className="min-h-screen bg-[#050816] relative">
            {/* Space Scene Background */}
            <SpaceScene />
            {/* Header */}
            <Header />
            {/* Main Content */}
            <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]" style={{marginTop: 0}}>
                    {/* Left side - Scrollable Content */}
                    <div className="order-2 lg:order-1 h-[calc(100vh-64px)] overflow-y-auto flex flex-col gap-4 px-2 md:px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <HolographicCard className="overflow-visible" glowColor="#4F46E5">
                                <YoutubeVideoDetails videoId={videoId} />
                            </HolographicCard>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <HolographicCard className="overflow-visible" glowColor="#4F46E5">
                                <ThumbnailGeneration videoId={videoId} />
                            </HolographicCard>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <HolographicCard className="overflow-visible" glowColor="#4F46E5">
                                <TitleGeneration videoId={videoId} />
                            </HolographicCard>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <HolographicCard className="overflow-visible" glowColor="#4F46E5">
                                <Transcription videoId={videoId} />
                            </HolographicCard>
                        </motion.div>
                    </div>
                    {/* Right side - Fixed Chat */}
                    <div className="order-1 lg:order-2 h-[calc(100vh-64px)] border-l border-white/10 bg-[#050816]/80 backdrop-blur-md flex flex-col">
                        <motion.div 
                            className="h-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <HolographicCard className="h-full rounded-none" glowColor="#4F46E5">
                                <AiAgentChat videoId={videoId} />
                            </HolographicCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}