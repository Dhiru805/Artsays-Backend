// const BiddingPass = require('../../../../Models/BiddingPass');

// module.exports = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const removed = await BiddingPass.findByIdAndDelete(id);
//     if (!removed) return res.status(404).json({ hasError: true, message: 'Pass not found' });
//     return res.status(200).json({ hasError: false, message: 'Pass deleted' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: 'Failed to delete pass' });
//   }
// };


const BiddingPass = require('../../../../Models/BiddingPass');

const deleteBiddingPass = async (req, res) => {
  try {
    const { id } = req.params;

    const removedPass = await BiddingPass.findByIdAndDelete(id);

    if (!removedPass) {
      return res.status(404).json({
        hasError: true,
        message: 'Bidding pass not found',
      });
    }

    return res.status(200).json({
      hasError: false,
      message: 'Bidding pass deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to delete bidding pass',
      error: error.message,
    });
  }
};

module.exports = deleteBiddingPass;
