// const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

// module.exports = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.userId || req.query.userId;
//     if (!userId) return res.status(401).json({ hasError: true, message: 'Unauthorized' });
//     const orders = await BiddingPassOrder.find({ user: userId })
//       .populate({ path: 'pass', select: 'name' })
//       .sort({ createdAt: -1 });
//     return res.status(200).json({ hasError: false, data: orders, message: 'OK' });
//   } catch (e) {
//     return res.status(500).json({ hasError: true, message: 'Failed to list orders' });
//   }
// };


const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

const getUserBiddingPassOrders = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({
        hasError: true,
        message: 'Unauthorized access: userId is required',
      });
    }

    const orders = await BiddingPassOrder.find({ user: userId })
      .populate({ path: 'pass', select: 'name pricing validityPeriod' })
      .sort({ createdAt: -1 });

    orders.forEach(order => {
      if (order.pass && !order.pass.validityPeriod) {
        order.pass.validityPeriod = '30'; // Default to 30 days
      }
    });

    return res.status(200).json({
      hasError: false,
      data: orders,
      message: 'User bidding pass orders retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to retrieve user bidding pass orders',
      error: error.message,
    });
  }
};

module.exports = getUserBiddingPassOrders;
