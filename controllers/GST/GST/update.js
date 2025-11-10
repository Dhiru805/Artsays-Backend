const mongoose = require("mongoose");
const GSTSetting = require("../../../Models/GSTSetting");
const MainCategory = require("../../../Models/MainCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryId, percentage } = req.body;

    const errors = [];

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }

    if (!Number.isFinite(percentage) || percentage < 0) {
      errors.push("Percentage must be a non-negative number.");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid GST setting ID is required.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const gstSetting = await GSTSetting.findById(id);
    if (!gstSetting) {
      return res.status(404).json({
        hasError: true,
        message: `GST setting with ID ${id} not found.`,
      });
    }

    const mainCategoryExists = await MainCategory.findById(mainCategoryId);
    if (!mainCategoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
      });
    }

    gstSetting.mainCategoryId = mainCategoryId;
    gstSetting.percentage = percentage;

    await gstSetting.save();

    return res.status(200).json({
      hasError: false,
      message: "GST setting updated successfully.",
      data: gstSetting,
    });
  } catch (error) {
    console.error("Error updating GST setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A GST setting for the same main category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update GST setting.",
      error: error.message,
    });
  }
};

module.exports = update;