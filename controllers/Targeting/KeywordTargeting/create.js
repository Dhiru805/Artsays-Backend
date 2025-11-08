const mongoose = require("mongoose");
const KeywordTargetingSetting = require("../../../Models/KeywordTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateTargeting = (entry) => {
      const errors = [];
      const categories = ["broad", "phrase", "exact"];

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }
      if (!entry.categoryId || !mongoose.Types.ObjectId.isValid(entry.categoryId)) {
        errors.push("Valid category ID is required.");
      }
      if (!entry.subCategoryId || !mongoose.Types.ObjectId.isValid(entry.subCategoryId)) {
        errors.push("Valid sub category ID is required.");
      }
      if (!entry.keyword || typeof entry.keyword !== "string" || entry.keyword.trim() === "") {
        errors.push("Valid keyword is required.");
      }

      for (const cat of categories) {
        if (isNaN(entry[cat]?.range) || entry[cat]?.range < 0) {
          errors.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)} range must be a non-negative number.`);
        }
        if (!isNaN(entry[cat]?.range) && !Number.isInteger(entry[cat]?.range) && Number(entry[cat]?.range.toFixed(2)) !== entry[cat]?.range) {
          errors.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)} range must be an integer or have at most two decimal places.`);
        }
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateTargeting(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdTargetings = [];

    for (const entry of data) {
      const { mainCategoryId, categoryId, subCategoryId, keyword, broad, phrase, exact } = entry;

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

      const newTargeting = new KeywordTargetingSetting({
        mainCategoryId,
        categoryId,
        subCategoryId,
        keyword: keyword.trim(),
        broad: {
          range: Number.isInteger(broad.range) ? broad.range : Number(Number(broad.range).toFixed(2)),
        },
        phrase: {
          range: Number.isInteger(phrase.range) ? phrase.range : Number(Number(phrase.range).toFixed(2)),
        },
        exact: {
          range: Number.isInteger(exact.range) ? exact.range : Number(Number(exact.range).toFixed(2)),
        },
      });

      await newTargeting.save();
      createdTargetings.push(newTargeting);
    }

    return res.status(201).json({
      hasError: false,
      message: "Keyword targeting setting(s) created successfully.",
      data: createdTargetings,
    });
  } catch (error) {
    console.error("Error creating keyword targeting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A keyword targeting setting with the same main category, category, sub category, and keyword already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create keyword targeting setting.",
      error: error.message,
    });
  }
};

module.exports = create;