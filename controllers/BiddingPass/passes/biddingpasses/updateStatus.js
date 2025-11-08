// const BiddingPass = require('../../../../Models/BiddingPass');

// module.exports = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { active } = req.body;
//     const updated = await BiddingPass.findByIdAndUpdate(id, { active: !!active }, { new: true });
//     if (!updated) return res.status(404).json({ hasError: true, message: 'Pass not found' });
//     return res.status(200).json({ hasError: false, data: updated, message: 'Status updated' });
//   } catch (e) {
//     return res.status(400).json({ hasError: true, message: 'Failed to update status' });
//   }
// };


const BiddingPass = require('../../../../Models/BiddingPass');

const updateBiddingPassStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedPass = await BiddingPass.findByIdAndUpdate(
      id,
      { active: !!active },
      { new: true }
    );

    if (!updatedPass) {
      return res.status(404).json({
        hasError: true,
        message: 'Bidding pass not found',
      });
    }

    return res.status(200).json({
      hasError: false,
      data: updatedPass,
      message: 'Bidding pass status updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: 'Failed to update bidding pass status',
      error: error.message,
    });
  }
};

module.exports = updateBiddingPassStatus;
