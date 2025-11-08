const ProductSurfaceType = require("../../../Models/productsurfacetype");

const deleteProductSurfaceType = async (req, res) => {
  try {
    const { id } = req.params;

    const productSurfaceType = await ProductSurfaceType.findById(id);
    if (!productSurfaceType) {
      return res.status(404).json({ error: "Product Surface Type not found" });
    }

    await ProductSurfaceType.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Surface Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductSurfaceType;