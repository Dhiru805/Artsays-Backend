const Profile = require("../../../../Models/SocialMedia/profileSchema");
const User = require("../../../../Models/usermode");

const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { firstName, username, website, bio } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (username) user.username = username;
    if (website) user.website = website;
    if (bio) user.bio = bio;

    // If profile photo uploaded via multer
    if (req.file) {
      user.profilePhoto = `/uploads/profile_photos/${req.file.filename}`;
    }

    await user.save();

    // Update profile timestamps
    await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { updatedAt: new Date() } }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = updateProfile;
