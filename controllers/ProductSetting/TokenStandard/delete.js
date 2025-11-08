const TokenStandard = require("../../../Models/tokenstandard");

const deleteTokenStandard = async (req, res) => {
  try {
    const { id } = req.params;

    const tokenStandard = await TokenStandard.findById(id);
    if (!tokenStandard) {
      return res.status(404).json({ error: "Token Standard not found" });
    }

    await TokenStandard.findByIdAndDelete(id);

    res.status(200).json({ message: "Token Standard deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteTokenStandard;