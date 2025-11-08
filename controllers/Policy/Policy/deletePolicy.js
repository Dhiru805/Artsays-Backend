const mongoose = require('mongoose');
const Policy = require('../../../Models/Policy');

const deletePolicyById = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        hasError: true,
        message: 'Valid policy ID is required.',
      });
    }

    const policy = await Policy.findByIdAndDelete(id, { session });

    if (!policy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        hasError: true,
        message: 'Policy not found.',
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      hasError: false,
      message: 'Policy deleted successfully.',
      data: policy,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting policy:', error);
    return res.status(500).json({
      hasError: true,
      message: 'Failed to delete policy.',
      error: error.message,
    });
  }
};

module.exports = deletePolicyById;
