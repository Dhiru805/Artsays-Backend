const ProductType = require("../../../Models/producttype");

const getProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductTypes;
