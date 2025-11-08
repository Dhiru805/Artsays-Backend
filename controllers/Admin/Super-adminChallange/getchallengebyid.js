const Challenge = require("../../../Models/Challenge"); 

const getChallengeById = async (req, res) => {
  const { id } = req.params; 

  try {
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return res.status(404).json({
        hasError: true,
        message: "Challenge not found.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Challenge fetched successfully.",
      challenge,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch challenge.",
      error: error.message,
    });
  }
};

module.exports = getChallengeById;
