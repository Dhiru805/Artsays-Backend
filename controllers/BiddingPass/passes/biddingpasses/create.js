// const BiddingPass = require('../../../../Models/BiddingPass');

// module.exports = async (req, res) => {
//   try {
//     const pass = await BiddingPass.create(req.body || {});
//     return res.status(201).json({ hasError: false, data: pass, message: 'Pass created' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: e.message || 'Failed to create pass' });
//   }
// };


const BiddingPass = require('../../../../Models/BiddingPass');

const createBiddingPass = async (req, res) => {
  try {
    const pass = await BiddingPass.create(req.body || {});

    return res.status(201).json({
      hasError: false,
      data: pass,
      message: 'Bidding pass created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to create bidding pass',
      error: error.message,
    });
  }
};

module.exports = createBiddingPass;
