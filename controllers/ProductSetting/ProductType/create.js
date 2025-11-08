const ProductType = require("../../../Models/Producttype");

const createProductType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Type is required" });
    }

    const newProductType = new ProductType({ name });
    await newProductType.save();
    res
      .status(201)
      .json({ message: "Product Type added successfully", newProductType });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Product Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductType;
