const mongoose = require("mongoose");

const ProductPackagingTypeSchema = new mongoose.Schema(
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

const ProductPackagingType = mongoose.model("ProductPackagingType", ProductPackagingTypeSchema);

module.exports = ProductPackagingType;