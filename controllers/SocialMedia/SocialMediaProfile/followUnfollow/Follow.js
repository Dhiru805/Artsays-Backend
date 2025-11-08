const Profile = require("../../../../Models/SocialMedia/profileSchema");

const followUser = async (req, res) => {
  try {
    const { userId } = req.body; // logged-in user
    const { targetUserId } = req.params;

    if (userId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if both users have profiles
    const [myProfile, targetProfile] = await Promise.all([
      Profile.findOne({ user: userId }),
      Profile.findOne({ user: targetUserId }),
    ]);

    if (!myProfile) {
      return res.status(404).json({ message: "Your profile not found" });
    }
    if (!targetProfile) {
      return res.status(404).json({ message: "Target user profile not found" });
    }

    // Add target to user's following
    await Profile.findOneAndUpdate(
      { user: userId },
      { $addToSet: { following: targetUserId } },
      { new: true }
    );

    // Add user to target’s followers
    await Profile.findOneAndUpdate(
      { user: targetUserId },
      { $addToSet: { followers: userId } },
      { new: true }
    );

    res.status(200).json({ message: " Followed successfully" });
  } catch (error) {
    console.error(" Error following user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = followUser;
