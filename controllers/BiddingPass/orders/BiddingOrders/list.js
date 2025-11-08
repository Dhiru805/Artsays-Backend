// const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

// module.exports = async (req, res) => {
//   try {
//     const orders = await BiddingPassOrder.find()
//       .populate({ path: 'user', select: 'name lastName role' })
//       .populate({ path: 'pass', select: 'name' })
//       .sort({ createdAt: -1 });
//     return res.status(200).json({ hasError: false, data: orders, message: 'OK' });
//   } catch (e) {
//     return res.status(500).json({ hasError: true, message: 'Failed to list orders' });
//   }
// };


const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

const getAllBiddingPassOrders = async (req, res) => {
  try {
    const orders = await BiddingPassOrder.find()
      .populate({ path: 'user', select: 'name lastName role' })
      .populate({ path: 'pass', select: 'name pricing validityPeriod' })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      hasError: false,
      data: orders,
      message: 'Bidding pass orders retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to retrieve bidding pass orders',
      error: error.message,
    });
  }
};

module.exports = getAllBiddingPassOrders;
