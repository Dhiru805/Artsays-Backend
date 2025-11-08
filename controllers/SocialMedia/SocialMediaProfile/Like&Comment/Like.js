const Post = require("../../../../Models/SocialMedia/postSchema");

const likeUnlikePost = async (req, res) => {
  try {
   const { userId } = req.body;
    const { postId } = req.params;

    if (!postId || !userId) {
      return res.status(400).json({ message: "postId and userId are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if already liked
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike → remove userId from likes
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like → push userId
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
  message: isLiked ? "Post unliked" : "Post liked",
  isLiked: !isLiked,              // 👈 clear boolean
  likesCount: post.likes.length,
  likes: post.likes,
});

  } catch (error) {
    console.error("Error in like/unlike post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = likeUnlikePost;
