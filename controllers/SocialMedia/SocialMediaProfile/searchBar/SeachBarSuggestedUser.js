// controllers/SocialMedia/searchBarSuggestedController.js
const mongoose = require("mongoose");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const isValidId = (id) => !!id && mongoose.Types.ObjectId.isValid(id);

const AddSearchBarSuggestedUser = async (req, res) => {
  try {
    const { userId, suggestedUserId } = req.body;
    if (!userId || !suggestedUserId) return res.status(400).json({ success:false, message:"userId and suggestedUserId required" });
    if (!isValidId(suggestedUserId)) return res.status(400).json({ success:false, message:"invalid suggestedUserId" });

    let profile = await Profile.findOne({ user: userId });
    if (!profile) profile = new Profile({ user: userId, posts: [] });

    profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers || [];
    profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers.filter((s) => s.user.toString() !== suggestedUserId);
    profile.searchBarSuggestedUsers.unshift({ user: suggestedUserId });
    if (profile.searchBarSuggestedUsers.length > 5) profile.searchBarSuggestedUsers = profile.searchBarSuggestedUsers.slice(0,5);

    await profile.save();
    await profile.populate({ path: "searchBarSuggestedUsers.user", select: "username profilePhoto verified bio" });

    return res.json({ success:true, suggestedUsers: profile.searchBarSuggestedUsers.map((s)=>s.user) });
  } catch (err) {
    console.error("AddSearchBarSuggestedUser error:", err);
    return res.status(500).json({ success:false, message:"Server error", error: err.message });
  }
};


// Remove a single SearchBarSuggestedUser
const RemoveSearchBarSuggestedUser = async (req, res) => {
  try {
    const { userId, suggestedUserId } = req.params;
    if (!userId || !suggestedUserId) {
      return res.status(400).json({ success: false, message: "userId and suggestedUserId required" });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    profile.searchBarSuggestedUsers = (profile.searchBarSuggestedUsers || []).filter(
      (s) => s.user.toString() !== suggestedUserId
    );
    await profile.save();

    await profile.populate({ path: "searchBarSuggestedUsers.user", select: "username profilePhoto verified bio" });

    return res.json({
      success: true,
      suggestedUsers: profile.searchBarSuggestedUsers.map((s) => s.user),
    });
  } catch (err) {
    console.error("RemoveSearchBarSuggestedUser error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


const GetSearchBarSuggestedUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success:false, message:"userId required" });

    const profile = await Profile.findOne({ user: userId }).populate({ path: "searchBarSuggestedUsers.user", select: "username profilePhoto verified bio" }).lean();
    if (!profile) return res.status(404).json({ success:false, message: "Profile not found" });

    return res.json({ success:true, suggestedUsers: (profile.searchBarSuggestedUsers||[]).map(s=>s.user) });
  } catch (err) {
    console.error("GetSearchBarSuggestedUsers error:", err);
    return res.status(500).json({ success:false, message:"Server error", error: err.message });
  }
};

module.exports = {
  AddSearchBarSuggestedUser,
  RemoveSearchBarSuggestedUser,
  GetSearchBarSuggestedUsers,
};
