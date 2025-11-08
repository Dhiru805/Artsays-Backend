const mongoose = require("mongoose");
 
const liveDetailsSchema = new mongoose.Schema(
    {
        // Live Details
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, ref: "MainCategory" },
        thumbnail: { type: String },
        paidPromotion: { type: Boolean, default: false },
        tags: [{ type: String, required: true }],
        language: { type: String, required: true },
        license: { type: String, default: "Standard YouTube License" },
        allowEmbedding: { type: Boolean, default: false },
        comments: {
            comments: { type: String, enum: ['ON', 'OFF', 'PAUSE'], default: 'ON'},
            sortBy: { type: String, enum: ["Top", "Newest"], default: "Top", set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
        },
 
        // Custom
        customization: {
            comments: {
                liveChat: { type: Boolean, default: false },
                liveChatReplay: { type: Boolean, default: false },
                liveChatSummary: { type: Boolean, default: false }
            },
            participantModes: {
                anyone: { type: Boolean, default: false },
                subscribers: { type: Boolean, default: false },
                liveCommentary: { type: Boolean, default: false }
            },
            reactions: {
                liveReactions: { type: Boolean, default: false },
            }
        },
 
        // Live
        live: {
            isLive: { type: Boolean, default: false },
            streamDuration: { type: String, default: '00:00' },
            viewCount: { type: Number, default: 0 },
            likeCount: { type: Number, default: 0 },
            privacy: { type: String, enum: ['Public', 'Private', 'Members Only'], default: 'Public', required: true },
            viewersWaiting:{ 
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
                default: []
            },
            streamKey: { type: String}, // RTMP key
            streamUrl: { type: String}, // RTMP server URL
            chatMessages: [{
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
                message: { type: String },
                timestamp: { type: Date, default: Date.now }
            }]
        },
        createdAt: { type: Date, default: Date.now },
    }
);
 
const Live = mongoose.model("Live", liveDetailsSchema);
module.exports = Live;