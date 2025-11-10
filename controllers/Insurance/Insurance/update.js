const mongoose = require("mongoose");
const InsuranceSetting = require("../../../Models/InsuranceSetting");
const MainCategory = require("../../../Models/MainCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryId, insuranceName, oneYear, lifeTime } = req.body;

    const errors = [];
    const options = ["oneYear", "lifeTime"];

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }
    if (!insuranceName || typeof insuranceName !== "string" || insuranceName.trim() === "") {
      errors.push("Valid insurance name is required.");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid insurance setting ID is required.");
    }

    for (const opt of options) {
      const option = req.body[opt];
      if (isNaN(option?.percentage) || option?.percentage < 0) {
        errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} percentage must be a non-negative number.`);
      }
      if (!isNaN(option?.percentage) && !Number.isInteger(option?.percentage) && Number(option?.percentage.toFixed(2)) !== option?.percentage) {
        errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} percentage must be an integer or have at most two decimal places.`);
      }
      if (isNaN(option?.gst) || option?.gst < 0) {
        errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} GST must be a non-negative number.`);
      }
      if (!isNaN(option?.gst) && !Number.isInteger(option?.gst) && Number(option?.gst.toFixed(2)) !== option?.gst) {
        errors.push(`${opt === "oneYear" ? "1 Year" : "Life Time"} GST must be an integer or have at most two decimal places.`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const insuranceSetting = await InsuranceSetting.findById(id);
    if (!insuranceSetting) {
      return res.status(404).json({
        hasError: true,
        message: `Insurance setting with ID ${id} not found.`,
      });
    }

    const mainCategoryExists = await MainCategory.findById(mainCategoryId);
    if (!mainCategoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
      });
    }

    insuranceSetting.mainCategoryId = mainCategoryId;
    insuranceSetting.insuranceName = insuranceName.trim();
    insuranceSetting.oneYear = {
      percentage: Number.isInteger(oneYear.percentage) ? oneYear.percentage : Number(Number(oneYear.percentage).toFixed(2)),
      gst: Number.isInteger(oneYear.gst) ? oneYear.gst : Number(Number(oneYear.gst).toFixed(2)),
    };
    insuranceSetting.lifeTime = {
      percentage: Number.isInteger(lifeTime.percentage) ? lifeTime.percentage : Number(Number(lifeTime.percentage).toFixed(2)),
      gst: Number.isInteger(lifeTime.gst) ? lifeTime.gst : Number(Number(lifeTime.gst).toFixed(2)),
    };

    await insuranceSetting.save();

    return res.status(200).json({
      hasError: false,
      message: "Insurance setting updated successfully.",
      data: insuranceSetting,
    });
  } catch (error) {
    console.error("Error updating insurance setting:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An insurance setting with the same main category and insurance name already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update insurance setting.",
      error: error.message,
    });
  }
};

module.exports = update;
