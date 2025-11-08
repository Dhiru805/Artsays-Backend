const ProductSurfaceType = require("../../../Models/productsurfacetype");

const createProductSurfaceType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Surface Type is required" });
    }

    const newProductSurfaceType = new ProductSurfaceType({ name });
    await newProductSurfaceType.save();
    res.status(201).json({ message: "Product Surface Type added successfully", newProductSurfaceType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Surface Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductSurfaceType;