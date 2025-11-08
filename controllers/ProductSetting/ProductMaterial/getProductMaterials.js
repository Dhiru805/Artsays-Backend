const ProductMaterial = require("../../../Models/productmaterial");

const getProductMaterials = async (req, res) => {
  try {
    const productMaterials = await ProductMaterial.find();
    res.status(200).json(productMaterials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductMaterials;