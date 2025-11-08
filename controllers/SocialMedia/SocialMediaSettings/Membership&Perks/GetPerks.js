const PredefinedPerk = require("../../../../Models/PredefinedPerks");

// Controller: Get all predefined perks
const GetPerks = async (req, res) => {
  try {
    const perks = await PredefinedPerk.find();

    if (!perks || perks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No perks found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Perks fetched successfully",
      data: perks,
    });
  } catch (error) {
    console.error("Error fetching perks:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = GetPerks;
