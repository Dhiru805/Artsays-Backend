const ProductSurfaceType = require("../../../Models/productsurfacetype");

const updateProductSurfaceType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Product Surface Type name is required" });
    }

    const updatedProductSurfaceType = await ProductSurfaceType.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductSurfaceType) {
      return res.status(404).json({ error: "Product Surface Type not found" });
    }

    res.status(200).json({ message: "Product Surface Type updated successfully", updatedProductSurfaceType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Surface Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductSurfaceType;