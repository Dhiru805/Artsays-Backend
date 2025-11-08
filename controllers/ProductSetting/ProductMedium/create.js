const ProductMedium = require("../../../Models/productmedium");

const createProductMedium = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Medium is required" });
    }

    const newProductMedium = new ProductMedium({ name });
    await newProductMedium.save();
    res.status(201).json({ message: "Product Medium added successfully", newProductMedium });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Medium name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductMedium;