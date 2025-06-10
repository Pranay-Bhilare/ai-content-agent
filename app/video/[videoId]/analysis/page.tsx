import { Metadata } from 'next';
import AnalysisPageClient from './AnalysisPageClient';


export default async function AnalysisPage({ params }: { params: Promise<{ videoId: string }> }) {
    const video = await params;
    return <AnalysisPageClient videoId={video.videoId} />;
}

export const metadata: Metadata = {
    title: 'Video Analysis',
    description: 'Analyze your YouTube video content with AI',
};
