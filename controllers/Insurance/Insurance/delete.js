const mongoose = require("mongoose");
const InsuranceSetting = require("../../../Models/InsuranceSetting");

const deleteInsuranceSetting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid insurance setting ID is required.",
      });
    }

    const deletedSetting = await InsuranceSetting.findByIdAndDelete(id);

    if (!deletedSetting) {
      return res.status(404).json({
        hasError: true,
        message: `Insurance setting with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Insurance setting deleted successfully.",
      data: deletedSetting,
    });
  } catch (error) {
    console.error("Error deleting insurance setting:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete insurance setting.",
      error: error.message,
    });
  }
};

module.exports = deleteInsuranceSetting;
