const ProductType = require("../../../Models/Producttype");

const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Product Type name is required" });
    }

    const updatedProductType = await ProductType.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedProductType) {
      return res.status(404).json({ error: "Product Type not found" });
    }

    res.status(200).json({
      message: "Product Type updated successfully",
      updatedProductType,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Product Type name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductType;
