const mongoose = require("mongoose");
const ShippingAddress = require("../../../Models/Address");

const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid address ID is required.",
      });
    }


    const existingAddress = await ShippingAddress.findById(id);
    if (!existingAddress) {
      return res.status(404).json({
        hasError: true,
        message: "Shipping address not found.",
      });
    }


    await ShippingAddress.findByIdAndDelete(id);

    return res.status(200).json({
      hasError: false,
      message: "Shipping address deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting shipping address:", error);

    return res.status(500).json({
      hasError: true,
      message: "Failed to delete shipping address.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
};

module.exports = deleteShippingAddress;