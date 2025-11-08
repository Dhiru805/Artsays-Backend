const mongoose = require("mongoose");
const CertificationSetting = require("../../../Models/CertificationSetting");
const MainCategory = require("../../../Models/MainCategory");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { certificationName, mainCategoryId, estimatedDays } = req.body;

    const errors = [];

    if (!certificationName || typeof certificationName !== "string" || certificationName.trim() === "") {
      errors.push("Certification name is required and must be a non-empty string.");
    }

    if (!mainCategoryId || !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
      errors.push("Valid main category ID is required.");
    }

    if (!Number.isInteger(estimatedDays) || estimatedDays < 1) {
      errors.push("Estimated days must be a positive integer.");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid certification ID is required.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const certification = await CertificationSetting.findById(id);
    if (!certification) {
      return res.status(404).json({
        hasError: true,
        message: `Certification with ID ${id} not found.`,
      });
    }

    const mainCategoryExists = await MainCategory.findById(mainCategoryId);
    if (!mainCategoryExists) {
      return res.status(400).json({
        hasError: true,
        message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
      });
    }

    certification.certificationName = certificationName.trim();
    certification.mainCategoryId = mainCategoryId;
    certification.estimatedDays = estimatedDays;

    await certification.save();

    return res.status(200).json({
      hasError: false,
      message: "Certification updated successfully.",
      data: certification,
    });
  } catch (error) {
    console.error("Error updating Certification:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A certification with the same name already exists in the same main category.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update certification.",
      error: error.message,
    });
  }
};

module.exports = update;