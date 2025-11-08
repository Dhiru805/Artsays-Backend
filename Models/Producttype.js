const mongoose = require("mongoose");

const ProductTypeSchema = new mongoose.Schema(
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

const ProductType = mongoose.model("ProductType", ProductTypeSchema);

module.exports = ProductType;