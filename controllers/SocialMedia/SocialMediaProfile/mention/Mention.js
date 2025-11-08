const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

// ✅ Mention search (for "@username" suggestions)
const Mention = async (req, res) => {
  try {
    const { q, userId } = req.query;

    if (!q || !q.startsWith("@")) {
      return res
        .status(400)
        .json({ success: false, message: "Query must start with @" });
    }

    // Remove '@'
    const searchTerm = q.substring(1).trim();

    // 🔹 Blocked users (I blocked + blocked me)
    let blockedIds = [];
    let blockedMeIds = [];
    let myFollowing = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const myProfile = await Profile.findOne({ user: userId })
        .select("blocked following")
        .lean();

      blockedIds = myProfile ? myProfile.blocked.map((id) => id.toString()) : [];
      myFollowing = myProfile ? myProfile.following.map((id) => id.toString()) : [];

      const profiles = await Profile.find({ blocked: userId }).select("user").lean();
      blockedMeIds = profiles.map((p) => p.user.toString());
    }

    // Final exclusion
    const excludeIds = [...blockedIds, ...blockedMeIds, userId];

    // 🔹 Step 1: Find possible users
    let users = await User.find({
      username: { $regex: searchTerm, $options: "i" },
      _id: { $nin: excludeIds },
    })
      .select("username profilePhoto verified role")
      .limit(20)
      .lean();

    // 🔹 Step 2: Get their profiles to check mentionSettings
    const userIds = users.map((u) => u._id.toString());
    const profiles = await Profile.find({ user: { $in: userIds } })
      .select("user mentionSettings")
      .lean();

    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[p.user.toString()] = p.mentionSettings || { allowFrom: "everyone" };
    });

    // 🔹 Step 3: Filter users based on their mention settings
    users = users.filter((u) => {
      const mentionSetting = profileMap[u._id.toString()]?.allowFrom || "everyone";

      if (mentionSetting === "everyone") return true;
      if (mentionSetting === "none") return false;
      if (mentionSetting === "following") {
        return myFollowing.includes(u._id.toString());
      }

      return true; // default fallback
    });

    res.status(200).json({
      success: true,
      type: "mentions",
      users,
    });
  } catch (err) {
    console.error("Mention error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = Mention;
