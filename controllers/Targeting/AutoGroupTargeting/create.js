const mongoose = require("mongoose");
const GroupTargetingSetting = require("../../../Models/GroupTargeting");
const MainCategory = require("../../../Models/MainCategory");
const Category = require("../../../Models/Category");
const SubCategory = require("../../../Models/SubCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateTargeting = (entry) => {
      const errors = [];
      const categories = ["closeMatch", "looseMatch", "substitutes", "complements"];

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }
      if (!entry.categoryId || !mongoose.Types.ObjectId.isValid(entry.categoryId)) {
        errors.push("Valid category ID is required.");
      }
      if (!entry.subCategoryId || !mongoose.Types.ObjectId.isValid(entry.subCategoryId)) {
        errors.push("Valid sub category ID is required.");
      }

      for (const cat of categories) {
        if (isNaN(entry[cat]?.minRange) || entry[cat]?.minRange < 0) {
          errors.push(`${cat.replace(/([A-Z])/g, " $1")} minimum range must be a non-negative number.`);
        }
        if (isNaN(entry[cat]?.maxRange) || entry[cat]?.maxRange < entry[cat]?.minRange) {
          errors.push(`${cat.replace(/([A-Z])/g, " $1")} maximum range must be a number and greater than or equal to minimum range.`);
        }
        if (!isNaN(entry[cat]?.minRange) && !Number.isInteger(entry[cat]?.minRange) && Number(entry[cat]?.minRange.toFixed(2)) !== entry[cat]?.minRange) {
          errors.push(`${cat.replace(/([A-Z])/g, " $1")} minimum range must be an integer or have at most two decimal places.`);
        }
        if (!isNaN(entry[cat]?.maxRange) && !Number.isInteger(entry[cat]?.maxRange) && Number(entry[cat]?.maxRange.toFixed(2)) !== entry[cat]?.maxRange) {
          errors.push(`${cat.replace(/([A-Z])/g, " $1")} maximum range must be an integer or have at most two decimal places.`);
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
      const { mainCategoryId, categoryId, subCategoryId, closeMatch, looseMatch, substitutes, complements } = entry;

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

      const newTargeting = new GroupTargetingSetting({
        mainCategoryId,
        categoryId,
        subCategoryId,
        closeMatch: {
          minRange: Number.isInteger(closeMatch.minRange) ? closeMatch.minRange : Number(Number(closeMatch.minRange).toFixed(2)),
          maxRange: Number.isInteger(closeMatch.maxRange) ? closeMatch.maxRange : Number(Number(closeMatch.maxRange).toFixed(2)),
        },
        looseMatch: {
          minRange: Number.isInteger(looseMatch.minRange) ? looseMatch.minRange : Number(Number(looseMatch.minRange).toFixed(2)),
          maxRange: Number.isInteger(looseMatch.maxRange) ? looseMatch.maxRange : Number(Number(looseMatch.maxRange).toFixed(2)),
        },
        substitutes: {
          minRange: Number.isInteger(substitutes.minRange) ? substitutes.minRange : Number(Number(substitutes.minRange).toFixed(2)),
          maxRange: Number.isInteger(substitutes.maxRange) ? substitutes.maxRange : Number(Number(substitutes.maxRange).toFixed(2)),
        },
        complements: {
          minRange: Number.isInteger(complements.minRange) ? complements.minRange : Number(Number(complements.minRange).toFixed(2)),
          maxRange: Number.isInteger(complements.maxRange) ? complements.maxRange : Number(Number(complements.maxRange).toFixed(2)),
        },
      });

      await newTargeting.save();
      createdTargetings.push(newTargeting);
    }

    return res.status(201).json({
      hasError: false,
      message: "Group targeting setting(s) created successfully.",
      data: createdTargetings,
    });
  } catch (error) {
    console.error("Error creating group targeting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A group targeting setting with the same main category, category, and sub category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create group targeting setting.",
      error: error.message,
    });
  }
};

module.exports = create;