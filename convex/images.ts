import {v} from "convex/values"
import {mutation, query} from "./_generated/server"

export const getImages = query({
    args : { 
        videoId : v.string(),
        userId : v.string()
    },
    handler : async (ctx,args) => {
        const images = await ctx.db.query("images")
                                    .withIndex("by_user_and_video_id")
                                    .filter((q)=>q.eq(q.field("userId"),args.userId))
                                    .filter((q)=>q.eq(q.field("videoId"),args.videoId))
                                    .collect();

        const imageUrls = await Promise.all(
            images.map(async(image) => ({
                ...image,
                url : await ctx.storage.getUrl(image.storageId),
            })
            )
        )
        return imageUrls;
    }
})

export const generateUploadUrl = mutation(async(ctx) => {
    return await ctx.storage.generateUploadUrl();
})

export const storeImage = mutation({
    args : {
        storageId : v.id("_storage"),
        videoId : v.string(),
        userId: v.string(),
    },
    handler : async (ctx, args) => {
        const imageId = await ctx.db.insert("images", {
            storageId : args.storageId,
            videoId : args.videoId,
            userId: args.userId
        });

        return imageId
    }
})