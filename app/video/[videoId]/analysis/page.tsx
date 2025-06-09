import AnalysisPageClient from './AnalysisPageClient';

type Props = {
    params: { videoId: string };
};

export default async function AnalysisPage({ params }: Props) {
    const { videoId } = params;
    
    return <AnalysisPageClient videoId={videoId} />;
}
