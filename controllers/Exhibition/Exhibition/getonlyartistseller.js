const Exhibition = require('../../../Models/Exhibition');
const User = require('../../../Models/usermode');

const getExhibitionsByUserId = async (req, res) => {
  try {


    const exhibitions = await Exhibition.find({ 
      userType: { $in: ['Artist', 'Seller'] } 
    })
      .populate({
        path: 'userId',
        model: User,
        select: 'name lastName', 
      })
      .select('-__v') 
      .lean();

    if (!exhibitions || exhibitions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: `No exhibitions found for user ID: ${userId} with userType Artist or Seller.`,
      });
    }

 
    const formattedExhibitions = exhibitions.map(exhibition => ({
      ...exhibition,
      userName: exhibition.userId ? `${exhibition.userId.name} ${exhibition.userId.lastName}` : 'Unknown User',
    }));

    return res.status(200).json({
      hasError: false,
      message: `Exhibitions retrieved successfully for user.`,
      data: formattedExhibitions,
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