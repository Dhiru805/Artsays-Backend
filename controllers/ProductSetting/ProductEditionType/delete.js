const ProductEditionType = require("../../../Models/producteditiontype");

const deleteProductEditionType = async (req, res) => {
  try {
    const { id } = req.params;

    const productEditionType = await ProductEditionType.findById(id);
    if (!productEditionType) {
      return res.status(404).json({ error: "Product Edition Type not found" });
    }

    await ProductEditionType.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Edition Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductEditionType;