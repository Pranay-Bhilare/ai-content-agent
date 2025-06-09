"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Type } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface Title {
    _id: Id<"titles">;
    _creationTime: number;
    videoId: string;
    userId: string;
    title: string;
}

function TitleGeneration(videoId: { videoId: string }) {
    const { user } = useUser();
    const titles = useQuery(api.titles.getTitles, {
        userId: user?.id ?? "",
        videoId: videoId.videoId
    });

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Title Generation</h2>
            </div>

            <div className="space-y-3">
                {titles?.map((title, index) => (
                    <motion.div
                        key={title._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-indigo-400 font-mono text-sm">#{index + 1}</span>
                            <p className="text-white group-hover:text-white/90 transition-colors">
                                {title.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* No titles generated yet */}
            {!titles?.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8 px-4 rounded-lg mt-4 border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <p className="text-white/80">No titles have been generated yet</p>
                    <p className="text-sm text-white/60 mt-1">
                        Generate titles to see them appear here
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default TitleGeneration;