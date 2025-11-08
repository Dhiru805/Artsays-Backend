const mongoose = require('mongoose');
const Exhibition = require('../../../Models/Exhibition');

const deleteExhibitionById = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        hasError: true,
        message: 'Valid exhibition ID is required.',
      });
    }


    const exhibition = await Exhibition.findByIdAndDelete(id, { session });

    if (!exhibition) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        hasError: true,
        message: 'Exhibition not found.',
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      hasError: false,
      message: 'Exhibition deleted successfully.',
      data: exhibition,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting exhibition:', error);
    return res.status(500).json({
      hasError: true,
      message: 'Failed to delete exhibition.',
      error: error.message,
    });
  }
};

module.exports = deleteExhibitionById;