import { YoutubeTranscript, RateLimitError, VideoUnavailableError, TranscriptDisabledError, NoTranscriptError, LanguageNotFoundError } from 't-youtube-transcript-fetcher';
import { TranscriptEntry } from '@/types/types';

function formatTimestampFromSec(start: number): string {
  const minutes = Math.floor(start / 60);
  const seconds = Math.floor(start % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export async function getVideoTranscripts(videoId: string) {
  try {
    console.log(`📡 Fetching transcript for: ${videoId}`);
    const raw = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
    console.log(`✅ Transcript fetched: ${raw.length} segments`);
    const transcript: TranscriptEntry[] = raw.map(s => ({
      text: s.text,
      timestamp: formatTimestampFromSec(s.offset),
    }));
    return { transcript, cache: "no cache" };
  } catch (error: any) {
    console.error('🛑 Error fetching transcript:', error);

    // Optional: inspect error type
    if (error instanceof RateLimitError) {
      console.error('Rate limit reached – slow down requests.');
    } else if (error instanceof VideoUnavailableError) {
      console.error('Video unavailable or private.');
    } else if (error instanceof TranscriptDisabledError) {
      console.error('Transcript disabled for this video.');
    } else if (error instanceof NoTranscriptError) {
      console.error('No transcript available.');
    } else if (error instanceof LanguageNotFoundError) {
      console.error('Requested language not found.');
    }

    // Re-throw or return fallback
    throw error;
  }
}
