const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const DeletePost = async (req, res) => {
  try {
    const { postId, userId } = req.body; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

  
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    await Profile.findOneAndUpdate(
      { user: userId },
      { $pull: { posts: postId } }, // remove post from profile
      { new: true }
    );

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = DeletePost;
