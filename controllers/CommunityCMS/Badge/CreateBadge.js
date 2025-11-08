const VerificationBadge = require("../.././../Models/Badge");
const CreateBadge = async (req, res) => {
  try {
    const { badgeName, badgeDescription, badgePrice } = req.body;

    if (!badgeName || !badgeDescription || !badgePrice) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let badgeImage = null;
    if (req.file) {
      badgeImage = `/uploads/badge/${req.file.filename}`;
    }

    const badge = new VerificationBadge({
      badgeName,
      badgeDescription,
      badgePrice,
      badgeImage,
    });

    await badge.save();

    res.status(201).json({
      success: true,
      message: "Badge created successfully",
      data: badge,
    });
  } catch (error) {
    console.error("Error creating badge:", error);
    res.status(500).json({
      success: false,
      message: "Error creating badge",
      error: error.message,
    });
  }
};

module.exports = CreateBadge;
