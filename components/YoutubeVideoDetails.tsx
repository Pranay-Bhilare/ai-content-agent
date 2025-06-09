"use client"

import { useEffect, useState } from "react";
import { VideoDetails } from "@/types/types"
import { getVideoDetails } from "@/actions/getYoutubeVideoDetails";
import { Calendar, Eye, MessageCircle, ThumbsUp, Youtube } from "lucide-react";
import Image from "next/image";

type Props = {
    videoId: string;
};

function YoutubeVideoDetails({ videoId }: Props) {
    const [video, setVideo] = useState<VideoDetails | null>(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            const video = await getVideoDetails(videoId);
            setVideo(video);
        };
        fetchVideoDetails();
    }, [videoId]);

    if (!video) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="flex items-center gap-3 text-white/80">
                    <Youtube className="w-6 h-6 text-red-500" />
                    <span>Loading video details...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-xl mx-auto w-full">
            {/* Video Thumbnail */}
            <div className="relative w-full">
                <div className="relative rounded-lg overflow-hidden w-full">
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 600px"
                    />
                </div>
            </div>

            {/* Video Details */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 leading-tight">
                    {video.title}
                </h1>

                {/* Channel Info */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm opacity-25" />
                        <Image
                            src={video.channel.thumbnail}
                            alt={video.channel.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full relative"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                            {video.channel.title}
                        </p>
                        <p className="text-base text-white/60">
                            {video.channel.subscribers} subscribers
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Published Date */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 transition-colors hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            <p className="text-sm text-white/60">Published</p>
                        </div>
                        <p className="font-medium text-white">
                            {new Date(video.publishedAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Views */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 transition-colors hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <Eye className="w-4 h-4 text-indigo-400" />
                            <p className="text-sm text-white/60">Views</p>
                        </div>
                        <p className="font-medium text-white">{video.views}</p>
                    </div>

                    {/* Likes */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 transition-colors hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <ThumbsUp className="w-4 h-4 text-indigo-400" />
                            <p className="text-sm text-white/60">Likes</p>
                        </div>
                        <p className="font-medium text-white">{video.likes}</p>
                    </div>

                    {/* Comments */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 transition-colors hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <MessageCircle className="w-4 h-4 text-indigo-400" />
                            <p className="text-sm text-white/60">Comments</p>
                        </div>
                        <p className="font-medium text-white">{video.comments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YoutubeVideoDetails;