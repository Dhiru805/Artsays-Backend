// const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');
// const BiddingPass = require('../../../../Models/BiddingPass');

// module.exports = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.userId || req.body.userId;
//     const { passId } = req.body;
//     if (!userId || !passId) return res.status(400).json({ hasError: true, message: 'userId and passId required' });

//     const pass = await BiddingPass.findById(passId);
//     if (!pass || !pass.active) return res.status(400).json({ hasError: true, message: 'Invalid or inactive pass' });

//     const activeExists = await BiddingPassOrder.exists({ user: userId, active: true });
//     if (activeExists) return res.status(400).json({ hasError: true, message: 'You already have an active pass' });

//     const order = await BiddingPassOrder.create({ user: userId, pass: passId, active: true });
//     return res.status(201).json({ hasError: false, data: order, message: 'Pass purchased' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: 'Failed to purchase' });
//   }
// };


const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');
const BiddingPass = require('../../../../Models/BiddingPass');

const purchaseBiddingPass = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId || req.body.userId;
    const { passId } = req.body;

    if (!userId || !passId) {
      return res.status(400).json({
        hasError: true,
        message: 'userId and passId are required',
      });
    }

    const pass = await BiddingPass.findById(passId);
    if (!pass || !pass.active) {
      return res.status(400).json({
        hasError: true,
        message: 'Invalid or inactive pass',
      });
    }

    const activeExists = await BiddingPassOrder.exists({ user: userId, active: true });
    if (activeExists) {
      return res.status(400).json({
        hasError: true,
        message: 'You already have an active pass',
      });
    }

    const order = await BiddingPassOrder.create({
      user: userId,
      pass: passId,
      active: true,
    });

    return res.status(201).json({
      hasError: false,
      data: order,
      message: 'Pass purchased successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to purchase pass',
      error: error.message,
    });
  }
};

module.exports = purchaseBiddingPass;
