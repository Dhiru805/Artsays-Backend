const mongoose = require("mongoose");
const Certifications = require("../../../Models/Certification");

const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid certification ID is required.",
      });
    }

    const certification = await Certifications.findByIdAndDelete(id);
    if (!certification) {
      return res.status(404).json({
        hasError: true,
        message: `Certification with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Certification deleted successfully.",
      data: certification,
    });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete certification.",
      error: error.message,
    });
  }
};

module.exports = deleteCertification;