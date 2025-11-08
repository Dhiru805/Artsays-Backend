const ProductPackagingType = require("../../../Models/productpackagingtype");

const updateProductPackagingType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Product Packaging Type name is required" });
    }

    const updatedProductPackagingType = await ProductPackagingType.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductPackagingType) {
      return res.status(404).json({ error: "Product Packaging Type not found" });
    }

    res.status(200).json({ message: "Product Packaging Type updated successfully", updatedProductPackagingType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Packaging Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductPackagingType;