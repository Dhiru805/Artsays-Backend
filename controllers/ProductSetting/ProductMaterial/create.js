const ProductMaterial = require("../../../Models/productmaterial");

const createProductMaterial = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Material is required" });
    }

    const newProductMaterial = new ProductMaterial({ name });
    await newProductMaterial.save();
    res.status(201).json({ message: "Product Material added successfully", newProductMaterial });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Material name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductMaterial;