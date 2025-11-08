const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const Search = async (req, res) => {
  try {
    const { q, tag, userId } = req.query;  // ✅ now comes from query
 

    if (!q && !tag) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    // ✅ Convert userId safely
    let loggedInUserId = null;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      loggedInUserId = new mongoose.Types.ObjectId(userId); 
    }
    

    // --- build exclude list ---
    let excludeIds = [];

    if (loggedInUserId) {
      // 1. who I blocked
      const myProfile = await Profile.findOne({ user: loggedInUserId }).select(
        "blocked"
      );
      const iBlocked = myProfile
        ? myProfile.blocked.map((id) => id.toString())
        : [];

      // 2. who blocked me
      const blockedMeProfiles = await Profile.find({
        blocked: loggedInUserId,
      }).select("user");
      const blockedMe = blockedMeProfiles.map((p) => p.user.toString());

      // 3. myself
      excludeIds = [
        ...new Set([...iBlocked, ...blockedMe, loggedInUserId.toString()]),
      ];
    }
    console.log("Exclude IDs:", excludeIds);

    // 1️ Case: if searching with "q"
    if (q) {
      if (q.startsWith("#")) {
        const searchTag = q.substring(1).toLowerCase();

        const hashtags = await Post.distinct("hashtags", {
          hashtags: { $regex: searchTag, $options: "i" },
        });

        return res.status(200).json({
          type: "hashtags",
          tags: hashtags.slice(0, 10),
        });
      }

      // --- Username search ---
      let users = await User.find({
        username: { $regex: q, $options: "i" },
        ...(excludeIds.length > 0 ? { _id: { $nin: excludeIds } } : {}), // ✅ exclude blocked + me
      })
        .select("username profilePhoto verified bio city")
        .limit(10)
        .lean();

      return res.status(200).json({ type: "users", users });
    }

    // 2️ Case: hashtag clicked
    if (tag) {
      const posts = await Post.find({
        hashtags: { $regex: `^${tag}$`, $options: "i" },
      })
        .populate("user", "username profilePhoto verified")
        .select("caption images createdAt hashtags")
        .limit(20);

      return res.status(200).json({ type: "posts", posts });
    }
  } catch (err) {
    console.error("Search error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = Search;
