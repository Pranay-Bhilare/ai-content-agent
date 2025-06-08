import AiAgentChat from "@/components/AiAgentChat";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import Transcription from "@/components/Transcriptions";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";

type Props = {
    params: { videoId: string };
};

export default async function AnalysisPage({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return(
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-4rem)]">
                {/* Left side - Scrollable Content */}
                <div className="order-2 lg:order-1 overflow-y-auto px-6 py-8 h-full">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Youtube Video Details */}
                        <YoutubeVideoDetails videoId={videoId}/>
                        {/* Thumbnail Generation */}
                        <ThumbnailGeneration videoId={videoId}/>
                        {/* Title Generation */}
                        <TitleGeneration videoId={videoId}/>
                        {/* Transcriptions */}
                        <Transcription videoId={videoId}/>
                    </div>
                </div>

                {/* Right side - Fixed Chat */}
                <div className="order-1 lg:order-2 h-full border-l border-gray-200 bg-white">
                    <div className="h-full">
                        <AiAgentChat videoId={videoId} />
                    </div>
                </div>
            </div>
        </div>
    );
}
