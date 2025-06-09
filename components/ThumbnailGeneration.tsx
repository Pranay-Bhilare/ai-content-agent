"use client"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

function ThumbnailGeneration(videoId: { videoId: string }) {
    const vId = videoId.videoId;
    const { user } = useUser();
    const images = useQuery(api.images.getImages, {
        userId: user?.id ?? "",
        videoId: vId
    });

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Thumbnail Generation</h2>
            </div>

            <div className={`flex overflow-x-auto gap-4 pb-2 ${images?.length && "mt-4"}`}>
                {images?.map((image, index) => (
                    image.url && (
                        <motion.div
                            key={image._id}
                            className="flex-none relative group"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="w-[200px] h-[110px] relative">
                                <Image
                                    src={image.url}
                                    alt="Generated Image"
                                    width={200}
                                    height={110}
                                    className="rounded-lg object-cover shadow-2xl shadow-indigo-500/20"
                                />
                            </div>
                        </motion.div>
                    )
                ))}
            </div>

            {/* No images generated yet */}
            {!images?.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8 px-4 rounded-lg mt-4 border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <p className="text-white/80">No thumbnails have been generated yet</p>
                    <p className="text-sm text-white/60 mt-1">
                        Generate thumbnails to see them appear here
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default ThumbnailGeneration;