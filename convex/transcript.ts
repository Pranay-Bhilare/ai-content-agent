import {v} from "convex/values"
import {mutation,query} from "./_generated/server"

export const getTranscriptByVideoId = query({
    args : { 
        videoId : v.string(),
        userId : v.string()
    },
    handler : async (ctx,args) => {
        const trans = await ctx.db.query("transcript")
                                    .withIndex("by_user_and_video_id", (q) =>
                                        q.eq("userId",args.userId).eq("videoId",args.videoId))
                                    .unique();
        return trans;
    }
})

export const storeTranscript = mutation({
    args : {
        videoId : v.string(),
        userId : v.string(),
        transcript : v.array(
            v.object({
                text: v.string(),
                timestamp : v.string(),
            })
        )
    },
    handler : async (ctx,args) => { 
        // Checking whether transcript is already there or not.
        const existingTranscript = await ctx.db.query("transcript")
                                                .withIndex("by_user_and_video_id", (q) =>
                                                    q.eq("userId",args.userId).eq("videoId",args.videoId))
                                                .unique();

        if(existingTranscript){
            return existingTranscript
        }

        // Create new transcript
        const newTranscript = await ctx.db.insert("transcript",{
            videoId : args.videoId,
            userId : args.userId,
            transcript : args.transcript
        })

        return newTranscript;
    }   
})