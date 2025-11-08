// controllers/verification/checkEligibility.js
const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Badge = require("../../../../Models/Badge");
const Post = require("../../../../Models/SocialMedia/postSchema");

const CheckEligibility = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    if (!userId || !badgeId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and badgeId required" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(badgeId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid IDs" });
    }

    const user = await User.findById(userId).populate("verified");
    const badge = await Badge.findById(badgeId);

    if (!user || !badge) {
      return res
        .status(404)
        .json({ success: false, message: "User or Badge not found" });
    }

    // Already purchased?
    if (user.verified.some((b) => b._id.toString() === badgeId.toString())) {
      return res.json({
        success: false,
        reason: "already_purchased",
        message: "You already purchased this badge",
      });
    }

    // 🔹 Badge hierarchy
    const hierarchy = ["artsays", "trusted", "master"];
    const badgeLevel = hierarchy.findIndex((b) =>
      badge.badgeName.toLowerCase().includes(b)
    );

    // If user owns a higher-level badge → block lower-level
    const hasHigherBadge = user.verified.some((b) => {
      const ownedLevel = hierarchy.findIndex((h) =>
        b.badgeName.toLowerCase().includes(h)
      );
      return ownedLevel > badgeLevel; // means user has a higher badge already
    });

    if (hasHigherBadge) {
      return res.json({
        success: false,
        reason: "lower_not_allowed",
        message: `You already have a higher-level badge. Cannot purchase ${badge.badgeName}.`,
      });
    }

    // Default = eligible
    let eligible = true;
    let reason = "";

    const postCount = await Post.countDocuments({ user: userId });

    if (badge.badgeName.toLowerCase().includes("trusted")) {
      if (postCount < 5) {
        eligible = false;
        reason = "Need at least 5 artworks uploaded.";
      }
    }

    if (badge.badgeName.toLowerCase().includes("master")) {
      const hasTrusted = user.verified.some((b) =>
        b.badgeName.toLowerCase().includes("trusted")
      );
      if (!hasTrusted) {
        eligible = false;
        reason = "You must have a Trusted Badge first.";
      }
      if (postCount < 20) {
        eligible = false;
        reason = "Need at least 20 artworks uploaded.";
      }
      if ((user.totalSales || 0) < 10000) {
        eligible = false;
        reason = "Need ₹10,000+ in sales.";
      }
    }

    if (badge.badgeName.toLowerCase().includes("artsays")) {
      eligible = true; // ✅ always allowed unless blocked by higher badge
    }

    if (!eligible) {
      return res.json({
        success: false,
        reason: "criteria_failed",
        message: reason,
      });
    }

    return res.json({
      success: true,
      message: "Eligible to purchase badge",
    });
  } catch (err) {
    console.error("checkEligibility error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = CheckEligibility;
