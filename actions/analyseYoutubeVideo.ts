"use server";

import { getIdFromUrl } from "@/lib/getIdFromUrl";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData : FormData) {
    const url = formData.get("url")?.toString();
    if(!url) return;

    const videoId = getIdFromUrl(url) // TODO
    if(!videoId) return;

    redirect(`/video/${videoId}/analysis`);

}