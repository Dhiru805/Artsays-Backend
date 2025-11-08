const mongoose = require("mongoose");
const FAQ = require("../../../Models/FAQ");

const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid FAQ ID is required.",
      });
    }

    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({
        hasError: true,
        message: `FAQ with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "FAQ deleted successfully.",
      data: faq,
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete FAQ.",
      error: error.message,
    });
  }
};

module.exports = deleteFAQ;
