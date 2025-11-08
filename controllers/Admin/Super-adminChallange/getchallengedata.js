const Challenge = require("../../../Models/Challenge"); 

const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    
    return res.status(200).json({
      hasError: false,
      message: "Challenges fetched successfully.",
      challenges,
    });

  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch challenges.",
      error: error.message,
    });
  }
};

module.exports = getChallenges;
