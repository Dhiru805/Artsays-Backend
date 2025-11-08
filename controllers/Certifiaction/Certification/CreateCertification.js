const mongoose = require("mongoose");
const Certifications = require("../../../Models/Certification");
const User = require("../../../Models/usermode");
const Product = require("../../../Models/Products");
const MainCategory = require("../../../Models/MainCategory");
const CertificationSetting = require("../../../Models/CertificationSetting");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const errors = [];
    const createdCertifications = [];

    for (const entry of data) {
      const { userType, userId, productId, mainCategoryId, certificationId, certificationProvider, estimatedDays } = entry;
      if (!["Artist", "Seller"].includes(userType)) {
        errors.push(`Invalid user type for certification: ${userType}.`);
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("Valid user ID is required.");
      }
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        errors.push("Valid product ID is required.");
      }
      if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
        errors.push("Valid main category ID is required.");
      }
      if (!mongoose.Types.ObjectId.isValid(certificationId)) {
        errors.push("Valid certification ID is required.");
      }
      if (!["inhouse", "thirdparty"].includes(certificationProvider)) {
        errors.push("Certification provider must be either inhouse or thirdparty.");
      }
      if (!Number.isInteger(estimatedDays) || estimatedDays < 1) {
        errors.push("Estimated days must be a positive integer.");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }


      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          hasError: true,
          message: `User with ID ${userId} not found.`,
        });
      }
      if (user.userType !== userType) {
        return res.status(400).json({
          hasError: true,
          message: `User type does not match the provided userType: ${userType}.`,
        });
      }


      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          hasError: true,
          message: `Product with ID ${productId} not found.`,
        });
      }
      if (product.userId.toString() !== userId) {
        return res.status(400).json({
          hasError: true,
          message: "Product does not belong to the selected user.",
        });
      }


      const mainCategory = await MainCategory.findById(mainCategoryId);
      if (!mainCategory) {
        return res.status(404).json({
          hasError: true,
          message: `Main category with ID ${mainCategoryId} not found.`,
        });
      }


      const certification = await CertificationSetting.findById(certificationId);
      if (!certification) {
        return res.status(404).json({
          hasError: true,
          message: `Certification with ID ${certificationId} not found.`,
        });
      }
      if (certification.mainCategoryId.toString() !== mainCategoryId) {
        return res.status(400).json({
          hasError: true,
          message: `Certification does not belong to the specified main category.`,
        });
      }


      const newCertification = new Certifications({
        userType,
        userId,
        productId,
        mainCategoryId,
        certificationId,
        certificationProvider,
        estimatedDays,
        certificationPrice: 99, 
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
    console.error("Error creating certifications:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "A certification with the same user, product, and certification ID already exists.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create certifications.",
      error: error.message,
    });
  }
};

module.exports = create;