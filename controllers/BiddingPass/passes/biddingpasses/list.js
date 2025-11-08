// const BiddingPass = require('../../../../Models/BiddingPass');

// module.exports = async (req, res) => {
//   try {
//     const passes = await BiddingPass.find().sort({ createdAt: -1 });
//     return res.status(200).json({ hasError: false, data: passes, message: 'OK' });
//   } catch (e) {
//     return res.status(500).json({ hasError: true, message: 'Failed to list passes' });
//   }
// };


const BiddingPass = require('../../../../Models/BiddingPass');

const getAllBiddingPasses = async (req, res) => {
  try {
    const passes = await BiddingPass.find().sort({ createdAt: -1 });

    return res.status(200).json({
      hasError: false,
      data: passes,
      message: 'Bidding passes retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to retrieve bidding passes',
      error: error.message,
    });
  }
};

module.exports = getAllBiddingPasses;
