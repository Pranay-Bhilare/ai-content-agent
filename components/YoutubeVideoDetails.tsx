"use client"

import { useEffect, useState } from "react";
import {VideoDetails} from "@/types/types"
import { getVideoDetails } from "@/actions/getYoutubeVideoDetails";
type Props = {
    videoId: string;
  };
export default function YoutubeVideoDetails({ videoId }: Props) {
    const [video, setVideo] = useState <VideoDetails | null>(null);

    useEffect(()=>{
        const fetchVideoDetails = async () => { 
            const video = await getVideoDetails(videoId);
            setVideo(video);
        };
        fetchVideoDetails();
    },[videoId]);
    return (
        <div>Youtube Details {videoId}</div>
    )
}