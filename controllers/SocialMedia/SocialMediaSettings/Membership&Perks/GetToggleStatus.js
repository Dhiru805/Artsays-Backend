// controllers/membership/getMembershipActive.js
const User = require("../../../../Models/usermode");

const GetMembershipActive = async (req, res) => {
  try {
    const { userId } = req.query; 

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findById(userId).select("userType membershipsActive");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "Artist") {
      return res.status(403).json({
        success: false,
        message: "Only Artists have memberships",
      });
    }

    res.status(200).json({
      success: true,
      membershipsActive: user.membershipsActive,
    });
  } catch (error) {
    console.error("Error fetching membership toggle state:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = GetMembershipActive;
