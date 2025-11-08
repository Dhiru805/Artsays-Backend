const mongoose = require("mongoose");
const CertificationSetting = require("../../../Models/CertificationSetting");
const MainCategory = require("../../../Models/MainCategory");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateCertification = (entry) => {
      const errors = [];

      if (!entry.certificationName || typeof entry.certificationName !== "string" || entry.certificationName.trim() === "") {
        errors.push("Certification name is required and must be a non-empty string.");
      }

      if (!entry.mainCategoryId || !mongoose.Types.ObjectId.isValid(entry.mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }

      if (!Number.isInteger(entry.estimatedDays) || entry.estimatedDays < 1) {
        errors.push("Estimated days must be a positive integer.");
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateCertification(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdCertifications = [];

    for (const entry of data) {
      const { certificationName, mainCategoryId, estimatedDays } = entry;

      const mainCategoryExists = await MainCategory.findById(mainCategoryId);
      if (!mainCategoryExists) {
        return res.status(400).json({
          hasError: true,
          message: `The specified main category (ID: ${mainCategoryId}) does not exist.`,
        });
      }

      const newCertification = new CertificationSetting({
        certificationName: certificationName.trim(),
        mainCategoryId,
        estimatedDays,
      });

      await newCertification.save();
      createdCertifications.push(newCertification);
    }

    return res.status(201).json({
      hasError: false,
      message: "Certification(s) created successfully.",
      data: createdCertifications,
    });
  } catch (error) {
    console.error("Error creating Certification:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A certification with the same name already exists in the same main category.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create certification.",
      error: error.message,
    });
  }
};

module.exports = create;