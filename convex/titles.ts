import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTitles = query({
    args: {
        videoId: v.string(),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        const titles = await ctx.db.query("titles")
            .withIndex("by_user_and_video_id", (q) =>
                q.eq("userId", args.userId).eq("videoId", args.videoId))
            .collect();

        return titles;
    }
});

export const storeTitle = mutation({
    args: {
        videoId: v.string(),
        userId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("titles", {
            videoId: args.videoId,
            userId: args.userId,
            title: args.title
        });
    }
}); 