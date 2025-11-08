const Profile = require("../../../../Models/SocialMedia/profileSchema");

const GetPostProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      postProductsEnabled: profile.postProductsEnabled,
    });
  } catch (error) {
    console.error("Error fetching post products state:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = GetPostProducts;
