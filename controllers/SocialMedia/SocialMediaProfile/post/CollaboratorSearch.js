const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const getCollaborators = async (req, res) => {
  try {
    const { query, userId } = req.query;

    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    // 🔹 Validate logged-in userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Valid userId required" });
    }

    // 🔹 Get logged-in user profile
    const myProfile = await Profile.findOne({ user: userId })
      .select("blocked following")
      .lean();

    if (!myProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const blockedIds = myProfile.blocked.map((id) => id.toString());
    const myFollowing = myProfile.following.map((id) => id.toString());

    // 🔹 Users who blocked me
    const blockedMeProfiles = await Profile.find({ blocked: userId }).select("user").lean();
    const blockedMeIds = blockedMeProfiles.map((p) => p.user.toString());

    // Final exclusion list
    const excludeIds = [...blockedIds, ...blockedMeIds, userId];

    // 🔹 Step 1: Find potential collaborators by username
    let users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $nin: excludeIds },
    })
      .select("username profilePhoto role _id")
      .limit(20)
      .lean();

    // 🔹 Step 2: Get their profiles to check collaborationSettings
    const userIds = users.map((u) => u._id.toString());
    const profiles = await Profile.find({ user: { $in: userIds } })
      .select("user collaborationSettings")
      .lean();

    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[p.user.toString()] = p.collaborationSettings || { allowFrom: "everyone" };
    });

    // 🔹 Step 3: Filter users by their collaboration settings
    users = users.filter((u) => {
      const collabSetting = profileMap[u._id.toString()]?.allowFrom || "everyone";

      if (collabSetting === "everyone") return true;
      if (collabSetting === "none") return false;
      if (collabSetting === "following") {
        return myFollowing.includes(u._id.toString());
      }

      return true; // fallback
    });

    res.status(200).json({ success: true, collaborators: users });
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = getCollaborators;
