import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import {streamText} from 'ai';
import { currentUser } from '@clerk/nextjs/server';
import { getVideoDetails } from '@/actions/getYoutubeVideoDetails';
import fetchTranscript from '@/tools/fetchTranscript';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();

  const user = await currentUser();
  if(!user){
    return NextResponse.json({error : "Unauthorised"}, {status : 401});
  }
  const videoDetails = await getVideoDetails(videoId)
  const systemMessage = `You are an AI agent, ready to take questions about video having following details of video titled: ${videoDetails?.title}, 
  which is having videoId as ${videoId}.

  IMPORTANT INSTRUCTIONS FOR HANDLING TRANSCRIPTS:
  1. When a user asks about the video content, transcript, or anything related to what was said in the video, ALWAYS use the fetchTranscript tool first.
  2. The fetchTranscript tool will provide you with the video's transcript segments.
  3. After getting the transcript, format your response in a clear, organized manner using proper markdown.
  4. If the transcript is not available or there's an error, inform the user politely.

  FORMAT YOUR RESPONSES:
  - Use proper markdown formatting
  - For transcripts, organize information in clear segments
  - Use bullet points or numbered lists when appropriate
  - Add timestamps when referencing specific parts of the video
  - Make the response easy to read and understand

  Remember to ALWAYS fetch and use the transcript when answering questions about video content.
  Check the cache of whether the transcript is already being cached and stored in database or not,or any erorr has occured, and based on that provide the message to the user too. 
  Also if user asks for providing the transcript, provide the exact transcript in proper NOTION format, if user asks for explaining the transcripts, then do so accordingly then.
  
  AND ALWAYS RESPOND IN FRIENDLY MANNER`

  const result = await streamText({
    model: google("models/gemini-2.0-flash-exp"),
    messages: [{
      role: "system",
      content: systemMessage,
    },
      ...messages
    ],
    tools: {
      fetchTranscript: fetchTranscript
    }
  })
  return result.toDataStreamResponse();
}