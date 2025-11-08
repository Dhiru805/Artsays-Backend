const ProductEditionType = require("../../../Models/producteditiontype");

const createProductEditionType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Product Edition Type is required" });
    }

    const newProductEditionType = new ProductEditionType({ name });
    await newProductEditionType.save();
    res.status(201).json({ message: "Product Edition Type added successfully", newProductEditionType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Edition Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProductEditionType;