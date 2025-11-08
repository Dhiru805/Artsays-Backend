// controllers/membership/toggleMembershipActive.js
const User = require("../../../../Models/usermode");

const ToggleMembershipActive = async (req, res) => {
  try {
    const { userId, active } = req.body;

    if (!userId || typeof active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "userId and active (true/false) are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   
    if (user.userType !== "Artist") {
      return res.status(403).json({
        success: false,
        message: "Only Artists can toggle memberships",
      });
    }

    user.membershipsActive = active;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Memberships ${active ? "activated" : "deactivated"} successfully`,
      membershipsActive: user.membershipsActive,
    });
  } catch (error) {
    console.error("Error toggling memberships:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = ToggleMembershipActive;
