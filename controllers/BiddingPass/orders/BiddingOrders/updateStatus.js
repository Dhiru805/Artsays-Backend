// const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

// module.exports = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { active } = req.body;
//     const updated = await BiddingPassOrder.findByIdAndUpdate(id, { active: !!active }, { new: true });
//     if (!updated) return res.status(404).json({ hasError: true, message: 'Order not found' });
//     return res.status(200).json({ hasError: false, data: updated, message: 'Status updated' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: 'Failed to update status' });
//   }
// };


const BiddingPassOrder = require('../../../../Models/BiddingPassOrder');

const updateBiddingPassOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedOrder = await BiddingPassOrder.findByIdAndUpdate(
      id,
      { active: !!active },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        hasError: true,
        message: 'Bidding pass order not found',
      });
    }

    return res.status(200).json({
      hasError: false,
      data: updatedOrder,
      message: 'Bidding pass order status updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to update bidding pass order status',
      error: error.message,
    });
  }
};

module.exports = updateBiddingPassOrderStatus;
