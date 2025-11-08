const VerificationBadge = require("../.././../Models/Badge");

const GetBadges = async (req, res) => {
  try {
    const badges = await VerificationBadge.find().sort({ createdAt: -1 });
    res.json({ success: true, data: badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching badges",
      error: error.message,
    });
  }
};

const GetBadgeById = async (req, res) => {
  try {
    const { id } = req.params;
    const badge = await VerificationBadge.findById(id);

    if (!badge) {
      return res
        .status(404)
        .json({ success: false, message: "Badge not found" });
    }

    res.json({ success: true, data: badge });
  } catch (error) {
    console.error("Error fetching badge:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching badge",
      error: error.message,
    });
  }
};

module.exports = { GetBadges, GetBadgeById };
