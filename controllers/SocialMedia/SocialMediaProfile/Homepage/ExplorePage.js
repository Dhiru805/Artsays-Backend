const mongoose = require("mongoose");
const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const ExploreController = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Valid userId is required" });
    }

    // 🔹 Find logged-in user profile
    const profile = await Profile.findOne({ user: userId }).select("following followers blocked");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // 1️⃣ Collect IDs
    const followingIds = profile.following.map((id) => id.toString());
    const followerIds = profile.followers.map((id) => id.toString());
    const blockedIds = profile.blocked.map((id) => id.toString());

    // 🔹 Find all users who have blocked me
    const blockedMeProfiles = await Profile.find({ blocked: userId }).select("user");
    const blockedMeIds = blockedMeProfiles.map((p) => p.user.toString());

    // Final blocked list (both directions)
    const excludedIds = [...blockedIds, ...blockedMeIds, userId.toString()];

    // 2️⃣ Build query conditions
    const conditions = [
      { user: { $in: followingIds } },
      { user: { $in: followerIds } },
      { user: { $nin: excludedIds } }, // random from others, excluding self + blocked
    ];

    // 3️⃣ Fetch posts with exclusions
    const posts = await Post.find({ $or: conditions })
      .populate("user", "username profilePhoto verified")
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    // 4️⃣ Shuffle results
    const shuffled = posts.sort(() => 0.5 - Math.random());

    res.status(200).json({
      success: true,
      posts: shuffled,
    });
  } catch (error) {
    console.error("Error fetching explore posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching explore posts",
      error: error.message,
    });
  }
};

module.exports = ExploreController;
