const mongoose = require('mongoose');

const BiddingPassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  validityPeriod: { type: String, default: '30' },
    productUploadLimit: { type: String },
    basePriceRange: { type: String },
    bidVisibility: { type: String, default: 'Public' },
    biddingAnalytics: { type: String, default: 'None' },
    addonAccess: [{ type: String }],
    supportPriority: { type: String, default: 'Standard' },
    refundPolicy: { type: String },
    earlyRenewalBonus: { type: String },
    customBidTimeControl: { type: String },
    exclusiveAuctionsAccess: { type: Boolean, default: false },
    dashboardFeatures: { type: String },
    pricing: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

BiddingPassSchema.statics.getDefaultPasses = function () {
  return [
    {
      name: 'One-Time Pass',
      validityPeriod: '10',
      productUploadLimit: '100',
      basePriceRange: '100-2000',
      bidVisibility: 'Public',
      biddingAnalytics: 'None',
      addonAccess: [],
      supportPriority: 'Standard',
      refundPolicy: 'No refunds',
      earlyRenewalBonus: '+1 day',
      customBidTimeControl: '',
      exclusiveAuctionsAccess: false,
      dashboardFeatures: '',
      pricing: '99',
      active: true,
    },
    {
      name: 'Monthly Pass',
      validityPeriod: '30',
      productUploadLimit: '1000',
      basePriceRange: '10000-50000',
      bidVisibility: 'Public',
      biddingAnalytics: 'Basic',
      addonAccess: ['Featured Ads'],
      supportPriority: 'Standard',
      refundPolicy: 'No refunds',
      earlyRenewalBonus: '+5 days',
      customBidTimeControl: '',
      exclusiveAuctionsAccess: false,
      dashboardFeatures: 'Basic insights',
      pricing: '249',
      active: true,
    },
    {
      name: 'Annual Pass',
      validityPeriod: '365',
      productUploadLimit: 'Infinite',
      basePriceRange: '1-1000000',
      bidVisibility: 'Public',
      biddingAnalytics: 'Advanced',
      addonAccess: ['Featured Ads', 'Boost'],
      supportPriority: 'Priority',
      refundPolicy: 'No refunds',
      earlyRenewalBonus: '+30 days',
      customBidTimeControl: 'Advanced',
      exclusiveAuctionsAccess: true,
      dashboardFeatures: 'Advanced insights and alerts',
      pricing: '999',
      active: true,
    },
  ];
};

module.exports = mongoose.model('BiddingPass', BiddingPassSchema);



