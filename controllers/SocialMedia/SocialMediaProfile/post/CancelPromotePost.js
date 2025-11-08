const mongoose = require("mongoose");
const Post = require("../../../../Models/SocialMedia/postSchema");

const CancelPromotePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // 🔹 Validate
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: "Valid Post ID required" });
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Valid User ID required" });
    }

    // 🔹 Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // 🔹 Check ownership
    if (String(post.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this promotion",
      });
    }

    // 🔹 Check if it’s promoted
    if (!post.isPromoted || !post.promotionDetails) {
      return res.status(400).json({ success: false, message: "This post is not currently promoted" });
    }

    // 🔹 Update promotion fields
    post.isPromoted = false;
    post.promotionDetails.status = "completed";

    post.promotionDetails.endDate = new Date(); // mark as ended immediately

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Promotion cancelled successfully!",
      post,
    });
  } catch (error) {
    console.error("❌ Error cancelling promoted post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while cancelling promotion",
      error: error.message,
    });
  }
};

module.exports = CancelPromotePost;
