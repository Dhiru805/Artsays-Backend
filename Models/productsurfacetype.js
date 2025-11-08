const mongoose = require("mongoose");

const ProductSurfaceTypeSchema = new mongoose.Schema(
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

const ProductSurfaceType = mongoose.model("ProductSurfaceType", ProductSurfaceTypeSchema);

module.exports = ProductSurfaceType;