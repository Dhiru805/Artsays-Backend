const mongoose = require("mongoose");
const Certifications = require("../../../Models/Certification");

const getCertifications = async (req, res) => {
  try {
    const certifications = await Certifications.find()
      .populate({
        path: "userId",
        select: "name lastName profilePhoto",
      })
      .populate({
        path: "productId",
        select: "productName mainImage",
      })
      .populate({
        path: "mainCategoryId",
        select: "mainCategoryName",
      })
      .populate({
        path: "certificationId",
        select: "certificationName estimatedDays",
      });

    return res.status(200).json({
      hasError: false,
      message: "Certifications fetched successfully.",
      data: certifications,
    });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch certifications.",
      error: error.message,
    });
  }
};

module.exports = getCertifications;