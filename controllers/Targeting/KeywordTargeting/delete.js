const mongoose = require("mongoose");
const KeywordTargetingSetting = require("../../../Models/KeywordTargeting");

const deleteTargeting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid keyword targeting ID is required.",
      });
    }

    const deletedTargeting = await KeywordTargetingSetting.findByIdAndDelete(id);

    if (!deletedTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Keyword targeting setting with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Keyword targeting setting deleted successfully.",
      data: deletedTargeting,
    });
  } catch (error) {
    console.error("Error deleting keyword targeting setting:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete keyword targeting setting.",
      error: error.message,
    });
  }
};

module.exports = deleteTargeting;