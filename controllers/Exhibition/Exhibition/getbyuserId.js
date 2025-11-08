const Exhibition = require('../../../Models/Exhibition');

const getExhibitionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        hasError: true,
        message: 'User ID is required.',
      });
    }

    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        hasError: true,
        message: 'Invalid User ID format.',
      });
    }


    const exhibitions = await Exhibition.find({ userId })
      .select('-__v')
      .lean();

    if (!exhibitions || exhibitions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: `No exhibitions found for user ID: ${userId}.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: `Exhibitions retrieved successfully for user.`,
      data: exhibitions,
    });
  } catch (error) {
    console.error('Error retrieving exhibitions by user ID:', error);
    return res.status(500).json({
      hasError: true,
      message: 'Failed to retrieve exhibitions.',
      error: error.message,
    });
  }
};

module.exports = getExhibitionsByUserId;