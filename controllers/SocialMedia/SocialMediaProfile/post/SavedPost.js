const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const saveUnsavePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;

    if (!userId || !postId) {
      return res.status(400).json({ message: "User ID and Post ID are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Use findOneAndUpdate to atomically update and return new profile
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const isSaved = profile.saved.includes(postId);

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      isSaved
        ? { $pull: { saved: postId } }
        : { $addToSet: { saved: postId } },
      { new: true } // 👈 ensures updated profile is returned
    );

    res.status(200).json({
      message: isSaved ? "Post unsaved" : "Post saved",
      isSaved: !isSaved,
      savedPosts: updatedProfile.saved, // ✅ correct updated array
    });
  } catch (error) {
    console.error("Error in save/unsave post:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = saveUnsavePost;

