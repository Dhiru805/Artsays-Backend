const mongoose = require("mongoose");

const ProductEditionTypeSchema = new mongoose.Schema(
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

const ProductEditionType = mongoose.model("ProductEditionType", ProductEditionTypeSchema);

module.exports = ProductEditionType;