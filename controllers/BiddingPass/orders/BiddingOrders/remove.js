// const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

// module.exports = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const removed = await BiddingPassOrder.findByIdAndDelete(id);
//     if (!removed) return res.status(404).json({ hasError: true, message: 'Order not found' });
//     return res.status(200).json({ hasError: false, message: 'Order deleted' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: 'Failed to delete order' });
//   }
// };


const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

const deleteBiddingPassOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const removedOrder = await BiddingPassOrder.findByIdAndDelete(id);

    if (!removedOrder) {
      return res.status(404).json({
        hasError: true,
        message: 'Bidding pass order not found',
      });
    }

    return res.status(200).json({
      hasError: false,
      message: 'Bidding pass order deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to delete bidding pass order',
      error: error.message,
    });
  }
};

module.exports = deleteBiddingPassOrder;
