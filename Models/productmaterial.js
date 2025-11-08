const mongoose = require("mongoose");

const ProductMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ProductMaterial = mongoose.model("ProductMaterial", ProductMaterialSchema);

module.exports = ProductMaterial;