const mongoose = require("mongoose");
const Product = require("../../../Models/Products");

const getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid user ID is required.",
      });
    }

    const products = await Product.find({ userId }).populate("mainCategory", "mainCategoryName");

    return res.status(200).json({
      hasError: false,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch products.",
      error: error.message,
    });
  }
};

module.exports = getProductsByUser;