const mongoose = require("mongoose");

const TokenStandardSchema = new mongoose.Schema(
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

const TokenStandard = mongoose.model("TokenStandard", TokenStandardSchema);

module.exports = TokenStandard;