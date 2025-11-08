const User = require("../../../Models/usermode");

const getUsersByType = async (req, res) => {
  try {
    const { userType } = req.query;

    if (!["Artist", "Seller"].includes(userType)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid user type. Must be 'Artist' or 'Seller'.",
      });
    }

    const users = await User.find({ userType }).select("_id name lastName");

    return res.status(200).json({
      hasError: false,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

module.exports = getUsersByType;