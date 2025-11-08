const ProductPackagingType = require("../../../Models/productpackagingtype");

const getProductPackagingTypes = async (req, res) => {
  try {
    const productPackagingTypes = await ProductPackagingType.find();
    res.status(200).json(productPackagingTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductPackagingTypes;