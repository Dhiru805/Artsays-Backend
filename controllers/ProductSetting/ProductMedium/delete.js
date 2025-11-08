const ProductMedium = require("../../../Models/productmedium");

const deleteProductMedium = async (req, res) => {
  try {
    const { id } = req.params;

    const productMedium = await ProductMedium.findById(id);
    if (!productMedium) {
      return res.status(404).json({ error: "Product Medium not found" });
    }

    await ProductMedium.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Medium deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductMedium;