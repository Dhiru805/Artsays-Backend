const mongoose = require("mongoose");
const AutoTargetingSetting = require("../../../Models/AutoTargeting");

const deleteAutoTargeting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid auto-targeting ID is required.",
      });
    }

    const autoTargeting = await AutoTargetingSetting.findByIdAndDelete(id);
    if (!autoTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Auto-targeting setting with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Auto-targeting setting deleted successfully.",
      data: autoTargeting,
    });
  } catch (error) {
    console.error("Error deleting auto-targeting setting:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete auto-targeting setting.",
      error: error.message,
    });
  }
};

module.exports = deleteAutoTargeting;