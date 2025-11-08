const BlockchainNetwork = require("../../../Models/blockchainnetwork");

const createBlockchainNetwork = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Blockchain Network is required" });
    }

    const newBlockchainNetwork = new BlockchainNetwork({ name });
    await newBlockchainNetwork.save();
    res.status(201).json({ message: "Blockchain Network added successfully", newBlockchainNetwork });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Blockchain Network name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createBlockchainNetwork;