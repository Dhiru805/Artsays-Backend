// get exhibition
const Exhibition = require('../../../Models/Exhibition');

const getExhibitionsByUserType = async (req, res) => {
  try {
    const { userType } = req.params; 


    if (!userType || !['Artist', 'Seller', 'Super-Admin'].includes(userType)) {
      return res.status(400).json({
        hasError: true,
        message: 'Valid user type (Artist, Seller, or Super-Admin) is required.',
      });
    }


    const exhibitions = await Exhibition.find({ userType })
      .select('-__v') 
      .lean(); 

    if (!exhibitions || exhibitions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: `No exhibitions found for user type: ${userType}.`,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: `Exhibitions retrieved successfully for user type: ${userType}.`,
      data: exhibitions,
    });
  } catch (error) {
    console.error('Error retrieving exhibitions by user type:', error);
    return res.status(500).json({
      hasError: true,
      message: 'Failed to retrieve exhibitions.',
      error: error.message,
    });
  }
};

module.exports = getExhibitionsByUserType;