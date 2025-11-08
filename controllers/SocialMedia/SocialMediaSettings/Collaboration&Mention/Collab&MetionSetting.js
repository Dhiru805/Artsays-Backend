const Profile = require("../../../../Models/SocialMedia/profileSchema");
const mongoose = require('mongoose');

const UpdateCollaborationMentionSettings = async (req, res) => {
  try {
    const { userId, collaborationSettings, mentionSettings } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Update collaboration
    if (collaborationSettings) {
      profile.collaborationSettings = {
        ...profile.collaborationSettings,
        ...collaborationSettings,
      };
    }

    //  Update mention
    if (mentionSettings) {
      profile.mentionSettings = {
        ...profile.mentionSettings,
        ...mentionSettings,
      };
    }

    await profile.save();

    return res.json({
      success: true,
      message: "Settings updated successfully",
      collaborationSettings: profile.collaborationSettings,
      mentionSettings: profile.mentionSettings,
    });
  } catch (err) {
    console.error("UpdateCollaborationMentionSettings error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// 🔹 Get Collaboration & Mention Settings

const GetCollaborationMentionSettings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === "null" || userId === "undefined" || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Valid userId required" });
    }

    const profile = await Profile.findOne({ user: userId })
      .select("collaborationSettings mentionSettings");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    return res.json({
      success: true,
      collaborationSettings: profile.collaborationSettings,
      mentionSettings: profile.mentionSettings,
    });
  } catch (err) {
    console.error("GetCollaborationMentionSettings error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


module.exports = {
  UpdateCollaborationMentionSettings,
  GetCollaborationMentionSettings,
};
