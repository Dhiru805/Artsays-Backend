const mongoose = require("mongoose");
const GSTSetting = require("../../../Models/GSTSetting");

const deleteGST = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid GST setting ID is required.",
      });
    }

    const gstSetting = await GSTSetting.findByIdAndDelete(id);
    if (!gstSetting) {
      return res.status(404).json({
        hasError: true,
        message: `GST setting with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "GST setting deleted successfully.",
      data: gstSetting,
    });
  } catch (error) {
    console.error("Error deleting GST setting:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete GST setting.",
      error: error.message,
    });
  }
};

module.exports = deleteGST;