const ProductMaterial = require("../../../Models/productmaterial");

const updateProductMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Product Material name is required" });
    }

    const updatedProductMaterial = await ProductMaterial.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductMaterial) {
      return res.status(404).json({ error: "Product Material not found" });
    }

    res.status(200).json({ message: "Product Material updated successfully", updatedProductMaterial });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Material name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductMaterial;