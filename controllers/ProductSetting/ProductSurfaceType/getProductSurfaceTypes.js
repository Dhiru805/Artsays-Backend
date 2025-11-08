const ProductSurfaceType = require("../../../Models/productsurfacetype");

const getProductSurfaceTypes = async (req, res) => {
  try {
    const productSurfaceTypes = await ProductSurfaceType.find();
    res.status(200).json(productSurfaceTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductSurfaceTypes;