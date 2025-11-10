const mongoose = require("mongoose");
const GSTSetting = require("../../../Models/GSTSetting");
const MainCategory = require("../../../Models/MainCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateGST = (entry) => {
      const errors = [];

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }

      if (!Number.isFinite(entry.percentage) || entry.percentage < 0) {
        errors.push("Percentage must be a non-negative number.");
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateGST(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdGSTSettings = [];

    for (const entry of data) {
      const { mainCategoryId, percentage } = entry;

      const mainCategoryExists = await MainCategory.findById(mainCategoryId);
      if (!mainCategoryExists) {
        return res.status(400).json({
          hasError: true,
          message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
        });
      }

      const newGSTSetting = new GSTSetting({
        mainCategoryId,
        percentage,
      });

      await newGSTSetting.save();
      createdGSTSettings.push(newGSTSetting);
    }

    return res.status(201).json({
      hasError: false,
      message: "GST setting(s) created successfully.",
      data: createdGSTSettings,
    });
  } catch (error) {
    console.error("Error creating GST setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A GST setting for the same main category already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create GST setting.",
      error: error.message,
    });
  }
};

module.exports = create;