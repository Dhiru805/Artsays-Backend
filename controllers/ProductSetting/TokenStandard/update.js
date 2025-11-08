const TokenStandard = require("../../../Models/tokenstandard");

const updateTokenStandard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Token Standard name is required" });
    }

    const updatedTokenStandard = await TokenStandard.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedTokenStandard) {
      return res.status(404).json({ error: "Token Standard not found" });
    }

    res.status(200).json({ message: "Token Standard updated successfully", updatedTokenStandard });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Token Standard name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateTokenStandard;