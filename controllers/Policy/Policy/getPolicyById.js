const Policy = require("../../../Models/Policy");
const mongoose = require("mongoose");

const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid policy ID is required.",
      });
    }

    const policy = await Policy.findById(id).select("-__v").lean();

    if (!policy) {
      return res.status(404).json({
        hasError: true,
        message: "Policy not found.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Policy retrieved successfully.",
      data: policy,
    });
  } catch (error) {
    console.error("Error fetching policy by ID:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve policy.",
      error: error.message,
    });
  }
};

module.exports = getPolicyById;
