const AutoTargetingSetting = require("../../../Models/AutoTargeting");

const getAutoTargetings = async (req, res) => {
  try {
    const autoTargetings = await AutoTargetingSetting.find()
      .populate("mainCategoryId")
      .populate("categoryId")
      .populate("subCategoryId");

    return res.status(200).json({
      hasError: false,
      message: "Auto-targeting settings fetched successfully.",
      data: autoTargetings,
    });
  } catch (error) {
    console.error("Error fetching auto-targeting settings:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch auto-targeting settings.",
      error: error.message,
    });
  }
};

module.exports = getAutoTargetings;