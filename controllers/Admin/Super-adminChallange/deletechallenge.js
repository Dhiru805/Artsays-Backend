const Challenge = require("../../../Models/Challenge"); 
const mongoose = require("mongoose");

const deleteChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id; 


    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid challenge ID format.",
      });
    }

    const challenge = await Challenge.findByIdAndDelete(challengeId);

    if (!challenge) {
      return res.status(404).json({
        hasError: true,
        message: "Challenge not found.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Challenge deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete challenge.",
    });
  }
};

module.exports = deleteChallenge;
