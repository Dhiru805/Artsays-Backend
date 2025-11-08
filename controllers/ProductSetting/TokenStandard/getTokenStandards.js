const TokenStandard = require("../../../Models/tokenstandard");

const getTokenStandards = async (req, res) => {
  try {
    const tokenStandards = await TokenStandard.find();
    res.status(200).json(tokenStandards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTokenStandards;