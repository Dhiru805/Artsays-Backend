const cron = require("node-cron");
const mongoose = require("mongoose");
const Post = require("../Models/SocialMedia/postSchema");

// 🕒 Runs every hour (at minute 0)
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Running hourly promotion expiry check...");

  try {
    // Find and update expired promotions
    const result = await Post.updateMany(
      {
        isPromoted: true,
        "promotionDetails.status": "active",
        "promotionDetails.endDate": { $lte: new Date() },
      },
      {
        $set: {
          isPromoted: false,
          "promotionDetails.status": "completed",
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `✅ ${result.modifiedCount} promotion(s) expired and marked as completed.`
      );
    } else {
      console.log("✅ No expired promotions found this hour.");
    }
  } catch (error) {
    console.error("❌ Error while expiring promotions:", error.message);
  }
});
