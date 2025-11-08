const TokenStandard = require("../../../Models/tokenstandard");

const createTokenStandard = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Token Standard is required" });
    }

    const newTokenStandard = new TokenStandard({ name });
    await newTokenStandard.save();
    res.status(201).json({ message: "Token Standard added successfully", newTokenStandard });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Token Standard name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createTokenStandard;