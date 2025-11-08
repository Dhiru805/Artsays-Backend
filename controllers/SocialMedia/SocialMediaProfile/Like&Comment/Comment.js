const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");
const User = require("../../../../Models/usermode");

// ✅ helper function to check if a user can comment
const canUserComment = async (postOwnerId, commenterId) => {
  // If the owner themselves is commenting → always allow
  if (postOwnerId.toString() === commenterId.toString()) {
    return true;
  }

  const ownerProfile = await Profile.findOne({ user: postOwnerId }).lean();
  if (!ownerProfile) return false;

  const { commentSettings } = ownerProfile;

  // default settings if not set
  const allowFrom = commentSettings?.allowCommentsFrom || "everyone";

  if (allowFrom === "everyone") return true;

  if (allowFrom === "followers") {
    return ownerProfile.followers.some(
      (id) => id.toString() === commenterId.toString()
    );
  }

  if (allowFrom === "following") {
    return ownerProfile.following.some(
      (id) => id.toString() === commenterId.toString()
    );
  }

  if (allowFrom === "mutual") {
    const isFollower = ownerProfile.followers.some(
      (id) => id.toString() === commenterId.toString()
    );
    const isFollowing = ownerProfile.following.some(
      (id) => id.toString() === commenterId.toString()
    );
    return isFollower && isFollowing;
  }

  return false;
};
// ✅ Add a comment with permission check
const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const { postId } = req.params;

    if (!userId || !text) {
      return res
        .status(400)
        .json({ message: "User ID and text are required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user is allowed
    const allowed = await canUserComment(post.user, userId);
    if (!allowed) {
      return res
        .status(403)
        .json({ message: "You are not allowed to comment on this post" });
    }

    // Add comment
    const newComment = { user: userId, text, createdAt: new Date() };
    post.comments.push(newComment);
    await post.save();

    // populate user details for frontend
    const populatedComment = await post.populate({
      path: "comments.user",
      select: "username profilePhoto verified",
    });

    const latestComment =
      populatedComment.comments[populatedComment.comments.length - 1];

    res.status(201).json({
      message: "Comment added successfully",
      comment: latestComment,
      comments: populatedComment.comments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// ✅ Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    comment.remove();
    await post.save();

    res.status(200).json({
      message: "Comment deleted successfully",
      comments: post.comments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

// ✅ Get all comments
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.user",
      "username profilePhoto"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ comments: post.comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

module.exports = { addComment, deleteComment, getComments };
