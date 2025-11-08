// controllers/report/createReport.js
const Report = require("../../../../Models/SocialMedia/ReportSchema");
const Post = require("../../../../Models/SocialMedia/postSchema");
const User = require("../../../../Models/usermode");

const createReport = async (req, res) => {
  try {
    const {
      reporterId,
      reportedUserId,
      reportType, // 'post', 'comment', or 'profile'
      postId,
      commentId,
      reason,
      description,
    } = req.body;

    // ✅ Validate common fields
    if (!reporterId || !reportedUserId || !reportType || !reason) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (reporterId, reportedUserId, reportType, reason)",
      });
    }

    // Validate reported user
    const reportedUser = await User.findById(reportedUserId);
    if (!reportedUser) {
      return res.status(404).json({ success: false, message: "Reported user not found" });
    }

    // ✅ Handle profile report
    if (reportType === "profile") {
      const report = new Report({
        reporter: reporterId,
        reportedUser: reportedUserId,
        reportType,
        reason,
        description,
      });
      await report.save();
      return res.status(201).json({ success: true, message: "Profile reported successfully", report });
    }

    // ✅ Handle post report
    if (reportType === "post") {
      if (!postId) {
        return res.status(400).json({ success: false, message: "postId is required for post reports" });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      const report = new Report({
        reporter: reporterId,
        reportedUser: reportedUserId,
        post: postId,
        reportType,
        reason,
        description,
      });
      await report.save();
      return res.status(201).json({ success: true, message: "Post reported successfully", report });
    }

    // ✅ Handle comment report
    if (reportType === "comment") {
      if (!postId || !commentId) {
        return res.status(400).json({
          success: false,
          message: "postId and commentId are required for comment reports",
        });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      const commentExists = post.comments.id(commentId);
      if (!commentExists) {
        return res.status(404).json({ success: false, message: "Comment not found in this post" });
      }

      const report = new Report({
        reporter: reporterId,
        reportedUser: reportedUserId,
        post: postId,
        commentId,
        reportType,
        reason,
        description,
      });
      await report.save();
      return res.status(201).json({ success: true, message: "Comment reported successfully", report });
    }

    // ❌ If reportType invalid
    res.status(400).json({ success: false, message: "Invalid reportType" });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating report",
      error: error.message,
    });
  }
};

module.exports = createReport;
