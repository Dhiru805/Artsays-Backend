const Profile = require("../../../../Models/SocialMedia/profileSchema");

const TogglePostProducts = async (req, res) => {
  try {
    const { userId, enabled } = req.body; // frontend: { userId, enabled: true/false }

    if (!userId || typeof enabled !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "userId and enabled (true/false) are required",
      });
    }

    const profile = await Profile.findOne({ user: userId }).populate("user");
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    if (profile.user.userType !== "Artist") {
      return res.status(403).json({ success: false, message: "Only Artists can toggle product posting" });
    }

    profile.postProductsEnabled = enabled;
    await profile.save();

    res.status(200).json({
      success: true,
      message: `Post products ${enabled ? "enabled" : "disabled"} successfully`,
      postProductsEnabled: profile.postProductsEnabled,
    });
  } catch (error) {
    console.error("Error toggling post products:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = TogglePostProducts;
