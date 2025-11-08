const ProductPackagingType = require("../../../Models/productpackagingtype");

const createProductPackagingType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Packaging Type is required" });
    }

    const newProductPackagingType = new ProductPackagingType({ name });
    await newProductPackagingType.save();
    res.status(201).json({ message: "Product Packaging Type added successfully", newProductPackagingType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Packaging Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductPackagingType;