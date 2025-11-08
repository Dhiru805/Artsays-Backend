const ProductMedium = require("../../../Models/productmedium");

const getProductMedium = async (req, res) => {
  try {
    const productMedia = await ProductMedium.find();
    res.status(200).json(productMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductMedium;