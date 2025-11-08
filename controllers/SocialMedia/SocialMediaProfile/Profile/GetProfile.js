const Profile = require("../../../../Models/SocialMedia/profileSchema");

const GetProfile = async (req, res) => {
  try {
    const { userId } = req.params; // profile being viewed

    // Find profile and populate posts + saved + blocked
    const profile = await Profile.findOne({ user: userId })
      .populate({
        path: "user",
        select: "email username name bio role profilePhoto website verified", // ✅ include verified
        populate: {
          path: "verified", // populate badge details
          model: "VerificationBadge",
          select: "badgeName badgeImage badgeDescription badgePrice",
        },
      })
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "username profilePhoto verified role" },
          { path: "comments.user", select: "username profilePhoto verified role" },
        ],
      })
      .populate({
        path: "saved",
        populate: [
          { path: "user", select: "username profilePhoto verified role" },
          { path: "comments.user", select: "username profilePhoto verified role" },
        ],
      })
      .populate({
        path: "blocked", // ✅ populate blocked users
        select: "username profilePhoto role",
      });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Build a set of saved post IDs
    const savedPostIds = new Set(profile.saved.map((p) => String(p._id)));

    // Enrich posts with isSaved
    const posts = profile.posts.map((post) => ({
      ...post.toObject(),
      isSaved: savedPostIds.has(String(post._id)),
    }));

    // Enrich saved (always true)
    const saved = profile.saved.map((post) => ({
      ...post.toObject(),
      isSaved: true,
    }));

    // Build response
    res.status(200).json({
      message: "Profile fetched successfully",
      profile: {
        _id: profile.user._id,
        email: profile.user.email,
        username: profile.user.username,
        firstName: profile.user.name,
        bio: profile.user.bio,
        role: profile.user.role,
        profilePhoto: profile.user.profilePhoto,
        website: profile.user.website,
        verified: profile.user.verified || null, // ✅ include verified badge
        posts,
        saved,
        postProductsEnabled:profile.postProductsEnabled,
        postCount: posts.length,
        followersCount: profile.followers.length,
        followingCount: profile.following.length,
        followers: profile.followers,
        following: profile.following,
        blocked: profile.blocked || [], // ✅ now contains populated users
        commentSettings: profile.commentSettings || {
          allowCommentsFrom: "everyone",
          allowGifComments: true,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = GetProfile;
