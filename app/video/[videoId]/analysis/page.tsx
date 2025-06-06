import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";

type Props = {
    params: { videoId: string };
};

export default async function AnalysisPage({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = await params;
    return(
        <div className="xl:container mx-auto px-4 md:px-0">
            <div className = "grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left side */}
                <div className="order-2 lg:order-1">
                    {/* Analysis Section */}
                    {/* Youtube Video Details */}
                    <YoutubeVideoDetails videoId={videoId}/>
                    {/* Thumbnail Generation */}
                    {/* Title Generation */}
                    {/* Transcriptions */}
                </div>
                {/* Right side */}
                <div className="order:1 lg:order-2">
                    {/* Chat section */}
                </div>
            </div>

        </div>
    );
}
