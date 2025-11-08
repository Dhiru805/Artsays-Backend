const mongoose = require("mongoose");
const GroupTargetingSetting = require("../../../Models/GroupTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryId, categoryId, subCategoryId, closeMatch, looseMatch, substitutes, complements } = req.body;

    const errors = [];
    const categories = ["closeMatch", "looseMatch", "substitutes", "complements"];

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      errors.push("Valid category ID is required.");
    }
    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
      errors.push("Valid sub category ID is required.");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid group targeting ID is required.");
    }

    for (const cat of categories) {
      const range = req.body[cat];
      if (isNaN(range?.minRange) || range?.minRange < 0) {
        errors.push(`${cat.replace(/([A-Z])/g, " $1")} minimum range must be a non-negative number.`);
      }
      if (isNaN(range?.maxRange) || range?.maxRange < range?.minRange) {
        errors.push(`${cat.replace(/([A-Z])/g, " $1")} maximum range must be a number and greater than or equal to minimum range.`);
      }
      if (!isNaN(range?.minRange) && !Number.isInteger(range?.minRange) && Number(range?.minRange.toFixed(2)) !== range?.minRange) {
        errors.push(`${cat.replace(/([A-Z])/g, " $1")} minimum range must be an integer or have at most two decimal places.`);
      }
      if (!isNaN(range?.maxRange) && !Number.isInteger(range?.maxRange) && Number(range?.maxRange.toFixed(2)) !== range?.maxRange) {
        errors.push(`${cat.replace(/([A-Z])/g, " $1")} maximum range must be an integer or have at most two decimal places.`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const groupTargeting = await GroupTargetingSetting.findById(id);
    if (!groupTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Group targeting setting with ID ${id} not found.`,
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

    groupTargeting.mainCategoryId = mainCategoryId;
    groupTargeting.categoryId = categoryId;
    groupTargeting.subCategoryId = subCategoryId;
    groupTargeting.closeMatch = {
      minRange: Number.isInteger(closeMatch.minRange) ? closeMatch.minRange : Number(Number(closeMatch.minRange).toFixed(2)),
      maxRange: Number.isInteger(closeMatch.maxRange) ? closeMatch.maxRange : Number(Number(closeMatch.maxRange).toFixed(2)),
    };
    groupTargeting.looseMatch = {
      minRange: Number.isInteger(looseMatch.minRange) ? looseMatch.minRange : Number(Number(looseMatch.minRange).toFixed(2)),
      maxRange: Number.isInteger(looseMatch.maxRange) ? looseMatch.maxRange : Number(Number(looseMatch.maxRange).toFixed(2)),
    };
    groupTargeting.substitutes = {
      minRange: Number.isInteger(substitutes.minRange) ? substitutes.minRange : Number(Number(substitutes.minRange).toFixed(2)),
      maxRange: Number.isInteger(substitutes.maxRange) ? substitutes.maxRange : Number(Number(substitutes.maxRange).toFixed(2)),
    };
    groupTargeting.complements = {
      minRange: Number.isInteger(complements.minRange) ? complements.minRange : Number(Number(complements.minRange).toFixed(2)),
      maxRange: Number.isInteger(complements.maxRange) ? complements.maxRange : Number(Number(complements.maxRange).toFixed(2)),
    };

    await groupTargeting.save();

    return res.status(200).json({
      hasError: false,
      message: "Group targeting setting updated successfully.",
      data: groupTargeting,
    });
  } catch (error) {
    console.error("Error updating group targeting setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A group targeting setting with the same main category, category, and sub category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update group targeting setting.",
      error: error.message,
    });
  }
};

module.exports = update;