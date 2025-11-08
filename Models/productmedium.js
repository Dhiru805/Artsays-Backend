const mongoose = require("mongoose");

const ProductMediumSchema = new mongoose.Schema(
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

const ProductMedium = mongoose.model("ProductMedium", ProductMediumSchema);

module.exports = ProductMedium;