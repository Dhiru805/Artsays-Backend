// Controllers/ProductCategory/getAllCategories.js
const Category = require("../../../Models/Category");

const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find().sort({ createdAt: -1 });

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found.",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories.",
      error: error.message,
    });
  }
};

module.exports = getAllCategories;
