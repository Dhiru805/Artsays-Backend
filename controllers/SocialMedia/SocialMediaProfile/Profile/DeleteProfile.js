// controllers/SocialMedia/accountController.js
const mongoose = require("mongoose");
const User = require("../../../../Models/usermode");
const Post = require("../../../../Models/SocialMedia/postSchema");  // adjust path
const Profile = require("../../../../Models/SocialMedia/profileSchema");


const DeleteAccount = async (req, res) => {
  try {
    const { userId } = req.params; // 👈 from route params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    // 1️⃣ Find profile
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // 2️⃣ Delete all posts by this user
    await Post.deleteMany({ user: userId });

    // 3️⃣ Remove this user from other users' followers & following
    await Profile.updateMany(
      { followers: userId },
      { $pull: { followers: userId } }
    );
    await Profile.updateMany(
      { following: userId },
      { $pull: { following: userId } }
    );

    // 4️⃣ Remove this user from other users' recent searches and suggestions
    await Profile.updateMany(
      { "recentSearches.refId": userId },
      { $pull: { recentSearches: { refId: userId } } }
    );
    await Profile.updateMany(
      { "searchBarSuggestedUsers.user": userId },
      { $pull: { searchBarSuggestedUsers: { user: userId } } }
    );

    // 5️⃣ Delete profile itself
    await Profile.deleteOne({ user: userId });

    // 6️⃣ Delete user document
    await User.deleteOne({ _id: userId });

    return res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("DeleteAccount error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = DeleteAccount ;
