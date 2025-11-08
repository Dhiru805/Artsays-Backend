const ProductPackagingType = require("../../../Models/productpackagingtype");

const deleteProductPackagingType = async (req, res) => {
  try {
    const { id } = req.params;

    const productPackagingType = await ProductPackagingType.findById(id);
    if (!productPackagingType) {
      return res.status(404).json({ error: "Product Packaging Type not found" });
    }

    await ProductPackagingType.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Packaging Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductPackagingType;