const mongoose = require('mongoose');
const Product = require('../../../Models/Products');
const User = require('../../../Models/usermode');
const Campaign = require('../../../Models/campaignSchema');

const getProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const trimmedUserId = userId.trim();

    if (!trimmedUserId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(trimmedUserId)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

 const user = await User.findById(trimmedUserId)
      .select('_id name lastName profilePhoto userType');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUserTypes = ['Artist', 'Seller', 'Super-admin'];
    if (!allowedUserTypes.includes(user.userType)) {
      return res.status(403).json({ message: 'User not authorized to fetch products' });
    }

    const currentDate = new Date().toISOString().split('T')[0]; 
    const activeCampaigns = await Campaign.find({
      $or: [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gt: currentDate } },
      ],
    }).select('selectedProductIds');

 
    const activeProductIds = activeCampaigns
      .flatMap(campaign => campaign.selectedProductIds)
      .map(id => id.toString());

    const products = await Product.find({
         userId: user._id,
      _id: { $nin: activeProductIds }, 
    }).populate('userId', 'name lastName profilePhoto');

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this artist' });
    }

    res.status(200).json({
      message: 'Products fetched successfully',
       user,
      data: products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

module.exports = getProduct;
