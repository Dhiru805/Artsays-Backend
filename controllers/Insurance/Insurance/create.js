const mongoose = require("mongoose");
const InsuranceSetting = require("../../../Models/InsuranceSetting");
const MainCategory = require("../../../Models/MainCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateSetting = (entry) => {
      const errors = [];
      const options = ["oneYear", "lifeTime"];

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }
      if (!entry.insuranceName || typeof entry.insuranceName !== "string" || entry.insuranceName.trim() === "") {
        errors.push("Valid insurance name is required.");
      }

      for (const opt of options) {
        if (isNaN(entry[opt]?.percentage) || entry[opt]?.percentage < 0) {
          errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} percentage must be a non-negative number.`);
        }
        if (!isNaN(entry[opt]?.percentage) && !Number.isInteger(entry[opt]?.percentage) && Number(entry[opt]?.percentage.toFixed(2)) !== entry[opt]?.percentage) {
          errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} percentage must be an integer or have at most two decimal places.`);
        }
        if (isNaN(entry[opt]?.gst) || entry[opt]?.gst < 0) {
          errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} GST must be a non-negative number.`);
        }
        if (!isNaN(entry[opt]?.gst) && !Number.isInteger(entry[opt]?.gst) && Number(entry[opt]?.gst.toFixed(2)) !== entry[opt]?.gst) {
          errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} GST must be an integer or have at most two decimal places.`);
        }
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateSetting(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdSettings = [];

    for (const entry of data) {
      const { mainCategoryId, insuranceName, oneYear, lifeTime } = entry;

      const mainCategoryExists = await MainCategory.findById(mainCategoryId);
      if (!mainCategoryExists) {
        return res.status(400).json({
          hasError: true,
          message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
        });
      }

      const newSetting = new InsuranceSetting({
        mainCategoryId,
        insuranceName: insuranceName.trim(),
        oneYear: {
          percentage: Number.isInteger(oneYear.percentage) ? oneYear.percentage : Number(Number(oneYear.percentage).toFixed(2)),
          gst: Number.isInteger(oneYear.gst) ? oneYear.gst : Number(Number(oneYear.gst).toFixed(2)),
        },
        lifeTime: {
          percentage: Number.isInteger(lifeTime.percentage) ? lifeTime.percentage : Number(Number(lifeTime.percentage).toFixed(2)),
          gst: Number.isInteger(lifeTime.gst) ? lifeTime.gst : Number(Number(lifeTime.gst).toFixed(2)),
        },
      });

      await newSetting.save();
      createdSettings.push(newSetting);
    }

    return res.status(201).json({
      hasError: false,
      message: "Insurance setting(s) created successfully.",
      data: createdSettings,
    });
  } catch (error) {
    console.error("Error creating insurance setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An insurance setting with the same main category and insurance name already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create insurance setting.",
      error: error.message,
    });
  }
};

module.exports = create;
