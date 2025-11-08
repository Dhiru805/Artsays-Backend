const ProductMedium = require("../../../Models/productmedium");

const updateProductMedium = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Product Medium name is required" });
    }

    const updatedProductMedium = await ProductMedium.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductMedium) {
      return res.status(404).json({ error: "Product Medium not found" });
    }

    res.status(200).json({ message: "Product Medium updated successfully", updatedProductMedium });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product Medium name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductMedium;