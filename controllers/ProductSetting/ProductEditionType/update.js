const ProductEditionType = require("../../../Models/producteditiontype");

const updateProductEditionType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Product Edition Type name is required" });
    }

    const updatedProductEditionType = await ProductEditionType.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductEditionType) {
      return res.status(404).json({ error: "Product Edition Type not found" });
    }

    res.status(200).json({ message: "Product Edition Type updated successfully", updatedProductEditionType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Edition Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductEditionType;