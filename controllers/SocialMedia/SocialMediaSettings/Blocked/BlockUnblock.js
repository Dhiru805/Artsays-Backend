const mongoose = require("mongoose");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const BlockUnblock = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
      return res.status(400).json({ success: false, message: "userId and targetUserId required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ success: false, message: "Invalid userId or targetUserId" });
    }

    if (userId === targetUserId) {
      return res.status(400).json({ success: false, message: "You cannot block yourself" });
    }

    // 1️ Get profiles
    const userProfile = await Profile.findOne({ user: userId });
    const targetProfile = await Profile.findOne({ user: targetUserId });

    if (!userProfile || !targetProfile) {
      return res.status(404).json({ success: false, message: "User profile not found" });
    }

    // 2️ Check if already blocked
    const alreadyBlocked = userProfile.blocked?.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (alreadyBlocked) {
      // 🔓 Unblock
      userProfile.blocked = userProfile.blocked.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      await userProfile.save();

      return res.json({ success: true, message: "User unblocked successfully", isBlocked: false });
    } else {
      // Block
      userProfile.blocked.push(targetUserId);

      //  Remove target from blocker’s followers/following
      userProfile.followers = userProfile.followers.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      userProfile.following = userProfile.following.filter(
        (id) => id.toString() !== targetUserId.toString()
      );

      //  Remove blocker from target’s followers/following
      targetProfile.followers = targetProfile.followers.filter(
        (id) => id.toString() !== userId.toString()
      );
      targetProfile.following = targetProfile.following.filter(
        (id) => id.toString() !== userId.toString()
      );

      // Remove target from blocker’s recent searches + suggested
      userProfile.recentSearches = userProfile.recentSearches.filter(
        (s) => !(s.type === "user" && s.refId?.toString() === targetUserId.toString())
      );
      userProfile.searchBarSuggestedUsers = userProfile.searchBarSuggestedUsers.filter(
        (s) => s.user.toString() !== targetUserId.toString()
      );

      //  Remove blocker from target’s recent searches + suggested
      targetProfile.recentSearches = targetProfile.recentSearches.filter(
        (s) => !(s.type === "user" && s.refId?.toString() === userId.toString())
      );
      targetProfile.searchBarSuggestedUsers = targetProfile.searchBarSuggestedUsers.filter(
        (s) => s.user.toString() !== userId.toString()
      );

      await userProfile.save();
      await targetProfile.save();

      return res.json({ success: true, message: "User blocked successfully", isBlocked: true });
    }
  } catch (err) {
    console.error("BlockUnblock error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = BlockUnblock;
