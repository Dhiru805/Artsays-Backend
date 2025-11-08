//delete Carrer api

const mongoose = require("mongoose");
const Career = require("../../../Models/Career");

const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid career ID is required.",
      });
    }

    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      return res.status(404).json({
        hasError: true,
        message: `Career with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Career deleted successfully.",
      data: career,
    });
  } catch (error) {
    console.error("Error deleting career:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete career.",
      error: error.message,
    });
  }
};

module.exports = deleteCareer;