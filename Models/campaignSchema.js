// const mongoose = require('mongoose');

// const campaignSchema = new mongoose.Schema({
//   campaignName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   startDate: {
//     type: String, 
//     required: true,
//   },
//   endDate: {
//     type: String,
//     default: null,
//   },
//   hasEndDate: {
//     type: Boolean,
//     default: false,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   dailyBudget: {
//     type: Number,
//     required: true,
//     min: 300, 
//   },
//   selectedProductIds: {
//     type: [mongoose.Schema.Types.ObjectId], 
//     required: true,
//     ref: "Product",
//     default: [],
//   },
//   biddingStrategy: {
//     type: String,
//     enum: ['dynamic-up-down', 'dynamic-down-only', 'fixed'],
//     default: 'dynamic-up-down',
//   },
//   targetingType: {
//     type: String,
//     enum: ['automatic', 'manual'],
//     default: 'automatic',
//   },
//   automaticBidType: {
//     type: String,
//     enum: ['default', 'targeting'],
//     default: 'default',
//   },
//   defaultBid: {
//     type: Number,
//     default: 0.00,
//   },
//   targetingGroups: {
//     closeMatch: {
//       enabled: { type: Boolean, default: true },
//       bid: { type: Number, default: 0.00 },
//     },
//     looseMatch: {
//       enabled: { type: Boolean, default: true },
//       bid: { type: Number, default: 0.00 },
//     },
//     substitutes: {
//       enabled: { type: Boolean, default: true },
//       bid: { type: Number, default: 0.00 },
//     },
//     complements: {
//       enabled: { type: Boolean, default: true },
//       bid: { type: Number, default: 0.00 },
//     },
//   },
//   selectedKeywords: [
//     {
//       keyword: { type: String, required: true },
//       matchType: { type: String, required: true },
//       suggestedBid: { type: Number, required: true },
//       bid: { type: Number, required: true },
//       id: { type: String, required: true }, 
//     },
//   ],
//   bidAdjustments: {
//     homepage: { type: Number, default: 0 },
//     topOfSearch: { type: Number, default: 0 },
//     restOfSearch: { type: Number, default: 0 },
//     topOfBrowse: { type: Number, default: 0 },
//     restOfBrowse: { type: Number, default: 0 },
//     productPage: { type: Number, default: 0 },
//   },
// }, {
//   timestamps: true, 
// });


// module.exports =  mongoose.model('Campaign', campaignSchema);

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
  campaignName: {
    type: String,
    trim: true,
    unique: true,
  },
  startDate: {
    type: String, 
  },
  endDate: {
    type: String,
    default: null,
  },
  hasEndDate: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
  },
  dailyBudget: {
    type: Number,
    min: 300, 
  },
  selectedProductIds: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: "Product",
    default: [],
  },
   selectedProductsDetails: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        productName: String,
        mainImage: String,
        finalPrice: Number,
        medium: String,
        editionType: String,
        productType: String,
        materials: [String],
      }
    ],
    default: [],
  },
  biddingStrategy: {
    type: String,
    enum: ['dynamic-up-down', 'dynamic-down-only', 'fixed'],
    default: 'dynamic-up-down',
  },
  targetingType: {
    type: String,
    enum: ['automatic', 'manual'],
    default: 'automatic',
  },
  automaticBidType: {
    type: String,
    enum: ['default', 'targeting'],
    default: 'default',
  },
  defaultBid: {
    type: Number,
    default: 0.00,
  },
  targetingGroups: {
    closeMatch: {
      enabled: { type: Boolean, default: false },
      bid: { type: Number, default: 0.00 },
    },
    looseMatch: {
      enabled: { type: Boolean, default: false },
      bid: { type: Number, default: 0.00 },
    },
    substitutes: {
      enabled: { type: Boolean, default: false },
      bid: { type: Number, default: 0.00 },
    },
    complements: {
      enabled: { type: Boolean, default: false },
      bid: { type: Number, default: 0.00 },
    },
  },
  selectedKeywords: [
    {
      keyword: { type: String, required: true },
      matchType: { type: String, required: true },
      suggestedBid: { type: Number, required: true },
      bid: { type: Number, required: true },
      id: { type: String, required: true }, 
    },
  ],
  bidAdjustments: {
    homepage: { type: Number, default: 0 },
    topOfSearch: { type: Number, default: 0 },
    restOfSearch: { type: Number, default: 0 },
    topOfBrowse: { type: Number, default: 0 },
    restOfBrowse: { type: Number, default: 0 },
    productPage: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["draft", "published","closed"],
    required: true,
    default: "draft"
  },

}, {
  timestamps: true, 
});


module.exports =  mongoose.model('Campaign', campaignSchema);