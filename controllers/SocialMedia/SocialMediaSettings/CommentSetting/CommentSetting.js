const Profile = require("../../../../Models/SocialMedia/profileSchema");

// ✅ Create or update comment settings
const UpdateCommentSettings = async (req, res) => {
  try {
    const { userId, allowCommentsFrom, allowGifComments } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }

    if (
      allowCommentsFrom &&
      !["everyone", "followers", "following", "mutual"].includes(allowCommentsFrom)
    ) {
      return res.status(400).json({ success: false, message: "Invalid allowCommentsFrom option" });
    }

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // update fields only if provided
    if (allowCommentsFrom) profile.commentSettings.allowCommentsFrom = allowCommentsFrom;
    if (typeof allowGifComments === "boolean") profile.commentSettings.allowGifComments = allowGifComments;

    await profile.save();

    res.json({
      success: true,
      message: "Comment settings updated successfully",
      commentSettings: profile.commentSettings,
    });
  } catch (err) {
    console.error("updateCommentSettings error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = UpdateCommentSettings ;
