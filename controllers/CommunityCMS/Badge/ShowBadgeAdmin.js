const User = require("../../../Models/usermode");

exports.getAllBadgeUsers = async (req, res) => {
  try {
    // Fetch users who have at least one badge
    const usersWithBadges = await User.find({ verified: { $exists: true, $ne: [] } })
      .populate("verified", "badgeName badgeDescription badgePrice badgeImage")
      .select("username email profilePhoto verified");

    res.status(200).json({
      success: true,
      message: "Users with purchased badges fetched successfully",
      count: usersWithBadges.length,
      users: usersWithBadges,
    });
  } catch (error) {
    console.error("Error fetching badge users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching badge users",
      error: error.message,
    });
  }
};
