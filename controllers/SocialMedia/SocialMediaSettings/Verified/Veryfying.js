// controllers/verification/purchaseBadge.js
const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Badge = require("../../../../Models/Badge");
const Post = require("../../../../Models/SocialMedia/postSchema");

const PurchaseBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    if (!userId || !badgeId) {
      return res.status(400).json({ success: false, message: "userId and badgeId required" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(badgeId)
    ) {
      return res.status(400).json({ success: false, message: "Invalid IDs" });
    }

    const user = await User.findById(userId).populate("verified");
    const badge = await Badge.findById(badgeId);

    if (!user || !badge) {
      return res.status(404).json({ success: false, message: "User or Badge not found" });
    }

    // Already purchased?
    if (user.verified.some((b) => b._id.toString() === badgeId.toString())) {
      return res
        .status(400)
        .json({ success: false, message: "You already own this badge" });
    }

    // Hierarchy definition
    const hierarchy = ["artsays", "trusted", "master"];
    const badgeLevel = hierarchy.findIndex((b) =>
      badge.badgeName.toLowerCase().includes(b)
    );

    if (badgeLevel === -1) {
      return res.status(400).json({ success: false, message: "Invalid badge type" });
    }

    // Re-check criteria
    const postCount = await Post.countDocuments({ user: userId });
    let meetsCriteria = true;

    if (badge.badgeName.toLowerCase().includes("trusted") && postCount < 5) {
      meetsCriteria = false;
    }

    if (badge.badgeName.toLowerCase().includes("master")) {
      const hasTrusted = user.verified.some((b) =>
        b.badgeName.toLowerCase().includes("trusted")
      );
      if (!hasTrusted) meetsCriteria = false;
      if (postCount < 20) meetsCriteria = false;
      if ((user.totalSales || 0) < 10000) meetsCriteria = false;
    }

    if (!meetsCriteria && !badge.badgeName.toLowerCase().includes("artsays")) {
      return res.status(400).json({
        success: false,
        message: `You do not meet the criteria for ${badge.badgeName}`,
      });
    }

    // ✅ Remove lower-level badges if upgrading
    user.verified = user.verified.filter((ownedBadge) => {
      const ownedLevel = hierarchy.findIndex((b) =>
        ownedBadge.badgeName.toLowerCase().includes(b)
      );
      return ownedLevel >= badgeLevel; // keep only same or higher-level
    });

    // ✅ Add new badge
    user.verified.push(badgeId);
    await user.save();

    return res.json({
      success: true,
      message: `${badge.badgeName} purchased successfully!`,
      verified: user.verified,
    });
  } catch (err) {
    console.error("purchaseBadge error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = PurchaseBadge;
