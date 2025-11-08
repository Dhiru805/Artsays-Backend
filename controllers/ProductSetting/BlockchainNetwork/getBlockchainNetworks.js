const BlockchainNetwork = require("../../../Models/blockchainnetwork");

const getBlockchainNetworks = async (req, res) => {
  try {
    const blockchainNetworks = await BlockchainNetwork.find();
    res.status(200).json(blockchainNetworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getBlockchainNetworks;