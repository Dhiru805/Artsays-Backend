const ProductType = require("../../../Models/Producttype");

const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;

    const productType = await ProductType.findById(id);
    if (!productType) {
      return res.status(404).json({ error: "Product Type not found" });
    }

    await ProductType.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductType;
