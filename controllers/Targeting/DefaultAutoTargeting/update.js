const mongoose = require("mongoose");
const AutoTargetingSetting = require("../../../Models/AutoTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryId, categoryId, subCategoryId, minRange, maxRange } = req.body;

    const errors = [];

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      errors.push("Valid category ID is required.");
    }
    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
      errors.push("Valid sub category ID is required.");
    }
    if (isNaN(minRange) || minRange < 0) {
      errors.push("Minimum range must be a non-negative number.");
    }
    if (isNaN(maxRange) || maxRange < minRange) {
      errors.push("Maximum range must be a number and greater than or equal to minimum range.");
    }
    if (!isNaN(minRange) && !Number.isInteger(minRange) && Number(minRange.toFixed(2)) !== minRange) {
      errors.push("Minimum range must be an integer or have at most two decimal places.");
    }
    if (!isNaN(maxRange) && !Number.isInteger(maxRange) && Number(maxRange.toFixed(2)) !== maxRange) {
      errors.push("Maximum range must be an integer or have at most two decimal places.");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid auto-targeting ID is required.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const autoTargeting = await AutoTargetingSetting.findById(id);
    if (!autoTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Auto-targeting setting with ID ${id} not found.`,
      });
    }

    const mainCategoryExists = await MainCategory.findById(mainCategoryId);
    if (!mainCategoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
      });
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified category (ID: ${categoryId}) does not exist.`,
      });
    }

    const subCategoryExists = await SubCategory.findById(subCategoryId);
    if (!subCategoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified sub category (ID: ${subCategoryId}) does not exist.`,
      });
    }

    autoTargeting.mainCategoryId = mainCategoryId;
    autoTargeting.categoryId = categoryId;
    autoTargeting.subCategoryId = subCategoryId;
    autoTargeting.minRange = Number.isInteger(minRange) ? minRange : Number(Number(minRange).toFixed(2));
    autoTargeting.maxRange = Number.isInteger(maxRange) ? maxRange : Number(Number(maxRange).toFixed(2));

    await autoTargeting.save();

    return res.status(200).json({
      hasError: false,
      message: "Auto-targeting setting updated successfully.",
      data: autoTargeting,
    });
  } catch (error) {
    console.error("Error updating auto-targeting setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An auto-targeting setting with the same main category, category, and sub category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update auto-targeting setting.",
      error: error.message,
    });
  }
};

module.exports = update;