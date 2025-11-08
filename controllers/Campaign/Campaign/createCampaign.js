const mongoose = require('mongoose');
const Campaign = require('../../../Models/campaignSchema');
const User = require('../../../Models/usermode');


const validateCampaignData = (data) => {
  const errors = [];


  if (!data.campaignName || data.campaignName.trim() === '') {
    errors.push('Campaign name is required.');
  }

  if (!data.startDate) {
    errors.push('Start date is required.');
  }

  if (!data.country) {
    errors.push('Country is required.');
  }

  if (!data.dailyBudget || data.dailyBudget < 300) {
    errors.push('Daily budget must be at least ₹300.');
  }

  if (!data.selectedProductIds || !Array.isArray(data.selectedProductIds) || data.selectedProductIds.length === 0) {
    errors.push('At least one product must be selected.');
  }


  const validBiddingStrategies = ['dynamic-up-down', 'dynamic-down-only', 'fixed'];
  if (!validBiddingStrategies.includes(data.biddingStrategy)) {
    errors.push(`Invalid bidding strategy: ${data.biddingStrategy}.`);
  }


  const validTargetingTypes = ['automatic', 'manual'];
  if (!validTargetingTypes.includes(data.targetingType)) {
    errors.push(`Invalid targeting type: ${data.targetingType}.`);
  }


  if (data.targetingType === 'automatic') {
    const validAutomaticBidTypes = ['default', 'targeting'];
    if (!validAutomaticBidTypes.includes(data.automaticBidType)) {
      errors.push(`Invalid automatic bid type: ${data.automaticBidType}.`);
    }

    if (data.automaticBidType === 'default' && (!data.defaultBid || data.defaultBid <= 0)) {
      errors.push('Default bid must be greater than 0.');
    }

    if (data.automaticBidType === 'targeting' && data.targetingGroups) {
      ['closeMatch', 'looseMatch', 'substitutes', 'complements'].forEach((group) => {
        const groupData = data.targetingGroups[group];
        if (groupData && groupData.enabled) {
          if (groupData.bid == null || groupData.bid <= 0) {
            errors.push(`${group} bid must be greater than 0 when enabled.`);
          }
        }
      });
    }
  }


  if (data.targetingType === 'manual' && data.selectedKeywords.length > 0) {
    data.selectedKeywords.forEach((keyword, index) => {
      if (!keyword.keyword) {
        errors.push(`selectedKeywords[${index}].keyword is required.`);
      }
      if (!keyword.matchType) {
        errors.push(`selectedKeywords[${index}].matchType is required.`);
      }
      if (!keyword.suggestedBid || keyword.suggestedBid <= 0) {
        errors.push(`selectedKeywords[${index}].suggestedBid must be greater than 0.`);
      }
      if (!keyword.bid || keyword.bid <= 0) {
        errors.push(`selectedKeywords[${index}].bid must be greater than 0.`);
      }
      if (!keyword.id) {
        errors.push(`selectedKeywords[${index}].id is required.`);
      }
    });
  }


  Object.keys(data.bidAdjustments).forEach((key) => {
    if (data.bidAdjustments[key] < 0 || data.bidAdjustments[key] > 900) {
      errors.push(`Bid adjustment for ${key} must be between 0% and 900%.`);
    }
  });

  return errors.length > 0 ? errors : null;
};


const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const errors = [];
    const createdCampaigns = [];
    const currentUserId = req.user && req.user._id ? req.user._id : null;

    for (const entry of data) {

      if (!entry.userId) {
        return res.status(400).json({
          hasError: true,
          message: 'User ID is required to create a campaign.',
        });
      }

      if (!entry.isDraft) {
        const validationErrors = validateCampaignData(entry);
        if (validationErrors) {
          errors.push(...validationErrors.map(err => `Campaign "${entry.campaignName || 'Unnamed'}": ${err}`));
          continue;
        }
      }

      ['closeMatch', 'looseMatch', 'substitutes', 'complements'].forEach((group) => {
        if (!entry.targetingGroups[group]) {
          entry.targetingGroups[group] = { enabled: false, bid: 0.00 };
        }
      });
      const existing = await Campaign.findOne({ campaignName: entry.campaignName });

      if (existing && existing._id.toString() !== entry._id?.toString()) {
        errors.push(`Campaign title "${entry.campaignName}" already exists. Use a unique name.`);
        continue;
      }
      if (entry._id) {
        const updated = await Campaign.findByIdAndUpdate(
          entry._id,
          {
            ...entry,
            userId: new mongoose.Types.ObjectId(entry.userId),
            status: entry.isDraft ? "draft" : "published",
            selectedProductIds: entry.selectedProductIds.map(id => new mongoose.Types.ObjectId(id)),
          },
          { new: true }
        );
        if (updated) {
          createdCampaigns.push(updated);
        } else {
          errors.push(`Campaign with ID ${entry._id} not found for update.`);
        }
      } else {

        const newCampaign = new Campaign({
          ...entry,
          userId: new mongoose.Types.ObjectId(entry.userId),
          status: entry.isDraft ? "draft" : "published",
          selectedProductIds: entry.selectedProductIds.map(id => new mongoose.Types.ObjectId(id)),
        });
        await newCampaign.save();
        createdCampaigns.push(newCampaign);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(', '),
        data: createdCampaigns,
      });
    }

    return res.status(201).json({
      hasError: false,
      message: 'Campaign(s) created successfully.',
      data: createdCampaigns,
    });
  } catch (error) {
    console.error('Error creating campaigns:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: 'A campaign with the same name already exists.',
      });
    }
    return res.status(500).json({
      hasError: true,
      message: 'Failed to create campaigns.',
      error: error.message,
    });
  }
};

module.exports = create;