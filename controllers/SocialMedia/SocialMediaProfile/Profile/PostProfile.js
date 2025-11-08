const Profile = require("../../../../Models/SocialMedia/profileSchema");
const User = require("../../../../Models/usermode");


const PostProfile = async (req, res) => {
  try {
    const { user: userId } = req.body;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists for this user" });
    }

    // Create profile with default values
    const profile = new Profile({
      user: userId,
      posts: [],
      followers: [],
      following: []
    });

    await profile.save();

    // Populate user details
    const populatedProfile = await Profile.findById(profile._id)
      .populate("user", "username firstName bio role profilePhoto website");

    res.status(201).json({
      message: "Profile created successfully",
      profile: {
        _id: populatedProfile.user._id,
        username: populatedProfile.user.username,
        firstName: populatedProfile.user.firstName,
        bio: populatedProfile.user.bio,
        role: populatedProfile.user.role,
        profilePhoto: populatedProfile.user.profilePhoto,
        website: populatedProfile.user.website,
        posts: populatedProfile.posts,
        postCount: populatedProfile.posts.length,
        followersCount: populatedProfile.followers.length,
        followingCount: populatedProfile.following.length,
        followers: populatedProfile.followers,
        following: populatedProfile.following,
      }
    });

  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = PostProfile;
