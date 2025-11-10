const mongoose = require("mongoose");
const DefaultShippingAddress = require("../../../Models/DefaultShippingAddress");
const Product = require("../../../Models/Products");

const getDefaultShippingAddressByProductId = async (req, res) => {
  try {
    const { productId } = req.params;


    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid product ID is required.",
      });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        hasError: true,
        message: `Product with ID ${productId} does not exist.`,
      });
    }
    const defaultAddress = await DefaultShippingAddress.findOne({ productId })
      .select("-__v")
      .lean();

    if (!defaultAddress) {
      return res.status(200).json({
        hasError: false,
        message: `No default shipping address found for product ID ${productId}.`,
        data: null,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: `Successfully retrieved default shipping address for product ID ${productId}.`,
      data: defaultAddress,
    });
  } catch (error) {
    console.error("Error fetching default shipping address:", error);

    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve default shipping address.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
};

module.exports = getDefaultShippingAddressByProductId;