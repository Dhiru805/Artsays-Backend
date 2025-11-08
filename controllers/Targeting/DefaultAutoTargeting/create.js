const mongoose = require("mongoose");
const AutoTargetingSetting = require("../../../Models/AutoTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateTargeting = (entry) => {
      const errors = [];

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }
      if (!entry.categoryId || !mongoose.Types.ObjectId.isValid(entry.categoryId)) {
        errors.push("Valid category ID is required.");
      }
      if (!entry.subCategoryId || !mongoose.Types.ObjectId.isValid(entry.subCategoryId)) {
        errors.push("Valid sub category ID is required.");
      }
      if (isNaN(entry.minRange) || entry.minRange < 0) {
        errors.push("Minimum range must be a non-negative number.");
      }
      if (isNaN(entry.maxRange) || entry.maxRange < entry.minRange) {
        errors.push("Maximum range must be a number and greater than or equal to minimum range.");
      }
      if (!isNaN(entry.minRange) && !Number.isInteger(entry.minRange) && Number(entry.minRange.toFixed(2)) !== entry.minRange) {
        errors.push("Minimum range must be an integer or have at most two decimal places.");
      }
      if (!isNaN(entry.maxRange) && !Number.isInteger(entry.maxRange) && Number(entry.maxRange.toFixed(2)) !== entry.maxRange) {
        errors.push("Maximum range must be an integer or have at most two decimal places.");
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
      const { mainCategoryId, categoryId, subCategoryId, minRange, maxRange } = entry;

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

      const newTargeting = new AutoTargetingSetting({
        mainCategoryId,
        categoryId,
        subCategoryId,
        minRange: Number.isInteger(minRange) ? minRange : Number(Number(minRange).toFixed(2)),
        maxRange: Number.isInteger(maxRange) ? maxRange : Number(Number(maxRange).toFixed(2)),
      });

      await newTargeting.save();
      createdTargetings.push(newTargeting);
    }

    return res.status(201).json({
      hasError: false,
      message: "Auto-targeting setting(s) created successfully.",
      data: createdTargetings,
    });
  } catch (error) {
    console.error("Error creating auto-targeting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An auto-targeting setting with the same main category, category, and sub category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create auto-targeting setting.",
      error: error.message,
    });
  }
};


module.exports = create;