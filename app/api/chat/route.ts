import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import {streamText} from 'ai';
import { currentUser } from '@clerk/nextjs/server';
import { getVideoDetails } from '@/actions/getYoutubeVideoDetails';
import fetchTranscript from '@/tools/fetchTranscript';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();

  const user = await currentUser();
  if(!user){
    return NextResponse.json({error : "Unauthorised"}, {status : 401});
  }
  const videoDetails = await getVideoDetails(videoId)
  const systemMessage = `You are an AI agent, ready to take questions about video having following details of video titled: ${videoDetails?.title}$, which is having videoId as ${videoId}$ and your task is to answer the user specific question in very friendly manner and formatted in rich markdown format.`
  const  result  = await streamText({
    model: google("models/gemini-2.0-flash-exp"),
    messages : [{
      role : "system",
      content : systemMessage,
    },
      ...messages
    ],
    tools : {
      fetchTranscript  : fetchTranscript
    }
    })
  return result.toDataStreamResponse();
}