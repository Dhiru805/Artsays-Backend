const mongoose = require('mongoose');
const Campaign = require('../../../Models/campaignSchema');
const User = require('../../../Models/usermode');

const getCampaignsByUser = async (req, res) => {
  try {
const currentUserId = req.params.userId;

    if (!currentUserId) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    const campaigns = await Campaign.find({ userId: currentUserId })
      .populate('selectedProductIds', 'productName price') 
      .sort({ createdAt: -1 });

    if (!campaigns.length) {
      return res.status(404).json({ message: 'No campaigns found for this user' });
    }

    res.status(200).json({
      message: 'Campaigns fetched successfully',
      data: campaigns,
    });

  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({
      message: 'Error fetching campaigns',
      error: error.message,
    });
  }
};

module.exports = getCampaignsByUser;
