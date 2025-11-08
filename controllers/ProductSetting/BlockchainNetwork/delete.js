const BlockchainNetwork = require("../../../Models/blockchainnetwork");

const deleteBlockchainNetwork = async (req, res) => {
  try {
    const { id } = req.params;

    const blockchainNetwork = await BlockchainNetwork.findById(id);
    if (!blockchainNetwork) {
      return res.status(404).json({ error: "Blockchain Network not found" });
    }

    await BlockchainNetwork.findByIdAndDelete(id);

    res.status(200).json({ message: "Blockchain Network deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteBlockchainNetwork;