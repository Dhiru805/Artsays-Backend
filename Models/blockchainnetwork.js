const mongoose = require("mongoose");

const BlockchainNetworkSchema = new mongoose.Schema(
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

const BlockchainNetwork = mongoose.model("BlockchainNetwork", BlockchainNetworkSchema);

module.exports = BlockchainNetwork;