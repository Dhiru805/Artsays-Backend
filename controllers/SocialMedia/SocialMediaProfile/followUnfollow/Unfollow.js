const Profile = require("../../../../Models/SocialMedia/profileSchema");

const unfollowUser = async (req, res) => {
  try {
   const { userId } = req.body;
    const { targetUserId } = req.params;

    if (userId === targetUserId) {
      return res.status(400).json({ message: " You cannot unfollow yourself" });
    }

    // Check if both users have profiles
    const [myProfile, targetProfile] = await Promise.all([
      Profile.findOne({ user: userId }),
      Profile.findOne({ user: targetUserId }),
    ]);

    if (!myProfile) {
      return res.status(404).json({ message: " Your profile not found" });
    }
    if (!targetProfile) {
      return res.status(404).json({ message: " Target user profile not found" });
    }

    // Remove target from user following
    await Profile.findOneAndUpdate(
      { user: userId },
      { $pull: { following: targetUserId } },
      { new: true }
    );

    // Remove me from target’s followers
    await Profile.findOneAndUpdate(
      { user: targetUserId },
      { $pull: { followers: userId } },
      { new: true }
    );

    res.status(200).json({ message: " Unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = unfollowUser;
