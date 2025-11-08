const mongoose = require("mongoose");
const KeywordTargetingSetting = require("../../../Models/KeywordTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryId, categoryId, subCategoryId, keyword, broad, phrase, exact } = req.body;

    const errors = [];
    const categories = ["broad", "phrase", "exact"];

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      errors.push("Valid category ID is required.");
    }
    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
      errors.push("Valid sub category ID is required.");
    }
    if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
      errors.push("Valid keyword is required.");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid keyword targeting ID is required.");
    }

    for (const cat of categories) {
      const range = req.body[cat]?.range;
      if (isNaN(range) || range < 0) {
        errors.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)} range must be a non-negative number.`);
      }
      if (!isNaN(range) && !Number.isInteger(range) && Number(range.toFixed(2)) !== range) {
        errors.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)} range must be an integer or have at most two decimal places.`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const keywordTargeting = await KeywordTargetingSetting.findById(id);
    if (!keywordTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Keyword targeting setting with ID ${id} not found.`,
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

    keywordTargeting.mainCategoryId = mainCategoryId;
    keywordTargeting.categoryId = categoryId;
    keywordTargeting.subCategoryId = subCategoryId;
    keywordTargeting.keyword = keyword.trim();
    keywordTargeting.broad = {
      range: Number.isInteger(broad.range) ? broad.range : Number(Number(broad.range).toFixed(2)),
    };
    keywordTargeting.phrase = {
      range: Number.isInteger(phrase.range) ? phrase.range : Number(Number(phrase.range).toFixed(2)),
    };
    keywordTargeting.exact = {
      range: Number.isInteger(exact.range) ? exact.range : Number(Number(exact.range).toFixed(2)),
    };

    await keywordTargeting.save();

    return res.status(200).json({
      hasError: false,
      message: "Keyword targeting setting updated successfully.",
      data: keywordTargeting,
    });
  } catch (error) {
    console.error("Error updating keyword targeting setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A keyword targeting setting with the same main category, category, sub category, and keyword already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update keyword targeting setting.",
      error: error.message,
    });
  }
};

module.exports = update;