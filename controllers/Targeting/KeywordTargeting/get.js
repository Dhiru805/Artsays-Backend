const KeywordTargetingSetting = require("../../../Models/KeywordTargeting");

const getAll = async (req, res) => {
  try {
    const keywordTargetings = await KeywordTargetingSetting.find()
      .populate("mainCategoryId", "mainCategoryName")
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .lean();

    return res.status(200).json({
      hasError: false,
      message: "Keyword targeting settings retrieved successfully.",
      data: keywordTargetings,
    });
  } catch (error) {
    console.error("Error retrieving keyword targeting settings:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve keyword targeting settings.",
      error: error.message,
    });
  }
};

module.exports = getAll;