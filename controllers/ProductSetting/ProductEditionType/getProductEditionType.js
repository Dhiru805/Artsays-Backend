const ProductEditionType = require("../../../Models/producteditiontype");

const getProductEditionTypes = async (req, res) => {
  try {
    const productEditionTypes = await ProductEditionType.find();
    res.status(200).json(productEditionTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductEditionTypes;