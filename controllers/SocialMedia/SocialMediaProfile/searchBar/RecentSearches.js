// controllers/SocialMedia/recentSearchController.js
const mongoose = require("mongoose");
const Profile = require("../../../../Models/SocialMedia/profileSchema"); // adjust path

// Helper to check ObjectId validity
const isValidId = (id) => !!id && mongoose.Types.ObjectId.isValid(id);

// ✅ Add recent search
const AddRecentSearch = async (req, res) => {
  try {
    const { userId, type, refId, tag, label } = req.body;

    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      profile = new Profile({ user: userId, posts: [] });
    }

    // --- Remove duplicates ---
    profile.recentSearches = profile.recentSearches.filter(
      (s) =>
        !(
          (s.type === type && s.refId?.toString() === refId) ||
          (s.type === "hashtag" && s.tag === tag)
        )
    );

    // --- Add correct object based on type ---
    if (type === "user") {
      profile.recentSearches.unshift({ type: "user", refId, label });
    } else if (type === "hashtag") {
      profile.recentSearches.unshift({ type: "hashtag", tag, label });
    }

    // --- Limit to 10 ---
    if (profile.recentSearches.length > 10) {
      profile.recentSearches = profile.recentSearches.slice(0, 10);
    }

    // --- Suggested Users (only if type = user and not self) ---
    if (type === "user" && refId && refId.toString() !== userId.toString()) {
      profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers.filter(
        (s) => s.user.toString() !== refId
      );

      profile.searchBarSuggestedUsers.unshift({ user: refId });
      if (profile.searchBarSuggestedUsers.length > 5) {
        profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers.slice(0, 5);
      }
    }

    await profile.save();
    await profile.populate({
      path: "searchBarSuggestedUsers.user",
      select: "username profilePhoto verified bio address role",
    });

    const followingIds = profile.following.map((id) => id.toString());

    res.json({
      success: true,
      recentSearches: profile.recentSearches,
      searchBarSuggestedUsers: profile.searchBarSuggestedUsers.map((s) => ({
        ...s.user.toObject(),
        isFollowing: followingIds.includes(s.user._id.toString()),
      })),
    });
  } catch (err) {
    console.error("Add recent search error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ Remove one recent search
const RemoveRecentSearch = async (req, res) => {
  try {
    const { userId, searchId } = req.params;
    if (!userId || !searchId) {
      return res.status(400).json({ success: false, message: "userId and searchId required" });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const item = profile.recentSearches.find((s) => s._id.toString() === searchId);
    if (!item) return res.status(404).json({ success: false, message: "Recent item not found" });

    if (item.type === "user" && item.refId) {
      profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers.filter(
        (s) => s.user.toString() !== item.refId.toString()
      );
    }

    profile.recentSearches = profile.recentSearches.filter(
      (s) => s._id.toString() !== searchId
    );

    await profile.save();
    await profile.populate({
      path: "searchBarSuggestedUsers.user",
      select: "username profilePhoto verified bio role address",
    });

    const followingIds = profile.following.map((id) => id.toString());

    return res.json({
      success: true,
      recentSearches: profile.recentSearches,
      searchBarSuggestedUsers: profile.searchBarSuggestedUsers.map((s) => ({
        ...s.user.toObject(),
        isFollowing: followingIds.includes(s.user._id.toString()),
      })),
    });
  } catch (err) {
    console.error("RemoveRecentSearch error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Clear all recent searches
const ClearRecentSearches = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "userId required" });

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    profile.recentSearches = [];
    profile.searchBarSuggestedUsers = [];
    await profile.save();

    return res.json({ success: true, recentSearches: [], searchBarSuggestedUsers: [] });
  } catch (err) {
    console.error("ClearRecentSearches error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Get recent searches + suggested users
const GetRecentSearches = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "userId required" });

    const profile = await Profile.findOne({ user: userId })
      .populate({
        path: "searchBarSuggestedUsers.user",
        select: "username profilePhoto verified bio role address",
      })
      .lean();

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const followingIds = (profile.following || []).map((id) => id.toString());

    return res.json({
      success: true,
      recentSearches: profile.recentSearches || [],
      searchBarSuggestedUsers: (profile.searchBarSuggestedUsers || []).map((s) => ({
        ...s.user,
        isFollowing: followingIds.includes(s.user._id.toString()),
      })),
    });
  } catch (err) {
    console.error("GetRecentSearches error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  AddRecentSearch,
  RemoveRecentSearch,
  ClearRecentSearches,
  GetRecentSearches,
};
