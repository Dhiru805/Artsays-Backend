const GroupTargetingSetting = require("../../../Models/GroupTargeting");

const getAll = async (req, res) => {
  try {
    const groupTargetings = await GroupTargetingSetting.find()
      .populate("mainCategoryId", "mainCategoryName")
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName")
      .lean();

    return res.status(200).json({
      hasError: false,
      message: "Group targeting settings retrieved successfully.",
      data: groupTargetings,
    });
  } catch (error) {
    console.error("Error retrieving group targeting settings:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve group targeting settings.",
      error: error.message,
    });
  }
};

module.exports = getAll;