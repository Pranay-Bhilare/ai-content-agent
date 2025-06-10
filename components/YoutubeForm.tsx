import { useState } from "react";
import Form from "next/form"
import AnalyseButton from "./AnalyseButton"
import { analyseYoutubeVideo } from "@/actions/analyseYoutubeVideo"

export default function YoutubeForm() {
    const [isAnalysing, setIsAnalysing] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Form 
                action={async (formData) => {
                    setIsAnalysing(true);
                    await analyseYoutubeVideo(formData);
                }}
                className="flex flex-row gap-2 items-center bg-[#181A20] rounded-xl shadow-lg px-4 py-3"
                style={{ boxShadow: "0 4px 24px 0 rgba(80, 80, 200, 0.10)" }}
            >
                <input 
                    name="url"
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="flex-1 w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    disabled={isAnalysing}
                />
                <AnalyseButton isAnalysing={isAnalysing} />
            </Form>
        </div>
    )
}