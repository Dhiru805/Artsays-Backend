const ProductMaterial = require("../../../Models/productmaterial");

const deleteProductMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const productMaterial = await ProductMaterial.findById(id);
    if (!productMaterial) {
      return res.status(404).json({ error: "Product Material not found" });
    }

    await ProductMaterial.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductMaterial;