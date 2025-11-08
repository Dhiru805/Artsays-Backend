const mongoose = require("mongoose");
const GroupTargetingSetting = require("../../../Models/GroupTargeting");

const deleteTargeting = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid group targeting ID is required.",
      });
    }

    const deletedTargeting = await GroupTargetingSetting.findByIdAndDelete(id);

    if (!deletedTargeting) {
      return res.status(404).json({
        hasError: true,
        message: `Group targeting setting with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Group targeting setting deleted successfully.",
      data: deletedTargeting,
    });
  } catch (error) {
    console.error("Error deleting group targeting setting:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete group targeting setting.",
      error: error.message,
    });
  }
};

module.exports = deleteTargeting;