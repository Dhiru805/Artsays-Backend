const VerificationBadge = require("../.././../Models/Badge");

const UpdateBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const { badgeName, badgeDescription, badgePrice } = req.body;

    const badge = await VerificationBadge.findById(id);
    if (!badge) {
      return res
        .status(404)
        .json({ success: false, message: "Badge not found" });
    }

    if (badgeName) badge.badgeName = badgeName;
    if (badgeDescription) badge.badgeDescription = badgeDescription;
    if (badgePrice) badge.badgePrice = badgePrice;

    if (req.file) {
      badge.badgeImage = `/uploads/badge/${req.file.filename}`;
    }

    await badge.save();

    res.status(200).json({
      success: true,
      message: "Badge updated successfully",
      data: badge,
    });
  } catch (error) {
    console.error("Error updating badge:", error);
    res.status(500).json({
      success: false,
      message: "Error updating badge",
      error: error.message,
    });
  }
};

module.exports = UpdateBadge;
