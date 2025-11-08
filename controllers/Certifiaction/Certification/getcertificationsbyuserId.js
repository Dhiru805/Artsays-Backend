const mongoose = require("mongoose");
const Certifications = require("../../../Models/Certification");

const getCertificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid userId format.",
      });
    }

    const certifications = await Certifications.find({ userId })
      .populate("userId")
      .populate("productId")
      .populate("mainCategoryId")
      .populate("certificationId");


    if (!certifications || certifications.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No certifications found for this user.",
        data: [],
      });
    }
    return res.status(200).json({
      hasError: false,
      message: "Certifications fetched successfully.",
      data: certifications,
    });
  } catch (error) {
    console.error("Error fetching certifications by userId:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch certifications.",
      error: error.message,
    });
  }
};

module.exports = getCertificationsByUserId;