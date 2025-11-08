const CertificationSetting = require("../../../Models/CertificationSetting");

const getCertifications = async (req, res) => {
  try {
    const certifications = await CertificationSetting.find().populate("mainCategoryId");

    return res.status(200).json({
      hasError: false,
      message: "Certifications fetched successfully.",
      data: certifications,
    });
  } catch (error) {
    console.error("Error fetching Certifications:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch certifications.",
      error: error.message,
    });
  }
};

module.exports = getCertifications;