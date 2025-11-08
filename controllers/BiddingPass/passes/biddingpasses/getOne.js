const BiddingPass = require('../../../../Models/BiddingPass');

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ hasError: true, message: 'Id required' });
    const pass = await BiddingPass.findById(id);
    if (!pass)
      return res.status(404).json({ hasError: true, message: 'Pass not found' });
    return res.json({ hasError: false, data: pass });
  } catch (err) {
    return res.status(500).json({ hasError: true, message: 'Failed', error: err.message });
  }
};

module.exports = getOne;


