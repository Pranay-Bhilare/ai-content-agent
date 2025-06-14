import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    videos : defineTable({
        videoId : v.string(),
        userId : v.string()
    }).index("by_user_id", ["userId"])
      .index("by_video_id",["videoId"]) 
      .index("by_user_and_video_id", ["userId","videoId"]),

    transcript : defineTable({
        videoId : v.string(),
        userId : v.string(),
        transcript : v.array(
            v.object({
                text: v.string(),
                timestamp : v.string()
            })
        )
    }).index("by_user_id", ["userId"])
    .index("by_video_id",["videoId"]) 
    .index("by_user_and_video_id", ["userId","videoId"]),

    images : defineTable({
        storageId : v.id("_storage"),
        videoId : v.string(),
        userId : v.string()
    }).index("by_user_id", ["userId"])
    .index("by_video_id",["videoId"]) 
    .index("by_user_and_video_id", ["userId","videoId"]),

    titles : defineTable({
        videoId : v.string(),
        userId : v.string(),
        title : v.string()
    }).index("by_user_id", ["userId"])
    .index("by_video_id",["videoId"]) 
    .index("by_user_and_video_id", ["userId","videoId"])
})