const BlockchainNetwork = require("../../../Models/blockchainnetwork");

const updateBlockchainNetwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Blockchain Network name is required" });
    }

    const updatedBlockchainNetwork = await BlockchainNetwork.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedBlockchainNetwork) {
      return res.status(404).json({ error: "Blockchain Network not found" });
    }

    res.status(200).json({ message: "Blockchain Network updated successfully", updatedBlockchainNetwork });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Blockchain Network name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateBlockchainNetwork;