const Challenge = require("../../../Models/Challenge"); 

// Previous implementation kept for reference
// const getLatestChallenge = async (req, res) => {
//   try {
//     // Fetch the latest created challenge
//     const latestChallenge = await Challenge.findOne().sort({ createdAt: -1 });
//
//     if (!latestChallenge) {
//       return res.status(404).json({
//         hasError: true,
//         message: "No challenges found.",
//       });
//     }
//
//     return res.status(200).json({
//       hasError: false,
//       message: "Latest challenge fetched successfully.",
//       data: { challenge: latestChallenge },
//     });
//
//   } catch (error) {
//     return res.status(500).json({
//       hasError: true,
//       message: "Failed to fetch the latest challenge.",
//       error: error.message,
//     });
//   }
// };

// New implementation: prioritize latest live challenge;
const getLatestChallenge = async (req, res) => {
  try {
    const latestLiveChallenge = await Challenge.findOne({ status: "live" })
      .sort({ createdAt: -1 });

    const latestChallenge = latestLiveChallenge || await Challenge.findOne().sort({ createdAt: -1 });

    if (!latestChallenge) {
      return res.status(404).json({
        hasError: true,
        message: "No challenges found.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Latest challenge fetched successfully.",
      data: { challenge: latestChallenge },
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch the latest challenge.",
      error: error.message,
    });
  }
};

module.exports = getLatestChallenge;
