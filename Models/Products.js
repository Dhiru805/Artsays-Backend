const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    //--------------------------------------------------------Basic Details-----------------------------//
    productName: {
      type: String,
      trim: true,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mainCategory: {
      type: String,
      ref: 'MainCategory',
      required: true
    },
    category: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subCategory: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true
    },
    productType: {
      type: String,
      enum: ['original', 'limited', 'open', 'nft'],
      required: true
    },
    editionNumber: {
      type: Number,
      min: 1
    },
    description: {
      type: String,
      required: true
    },
    targetedAudience: {
      type: String,
      trim: true,
      required: true
    },
    inspirationSource: {
      type: String,
      trim: true,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },

 //--------------------------------------------------------Artwork Details-----------------------------//
    medium: {
      type: String,
      required: true,
    },
    materials: {
      type: [String],
      required: true,
    },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    weight: {
      type: Number,
    },
    printResolution: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    editionType: {
      type: String,
      required: true,
    },
    framing: {
      type: String,
      enum: ['framed', 'unframed', 'rolled'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    hsnCode: {
      type: String,
      trim: true,
    },
    surfaceType: {
      type: String,
    },
    culturalRegion: {
      type: String,
    },
    biologicalMaterial: {
      type: String,
      trim: true,
    },
    functionalUse: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
    materialSource: {
      type: String,
      trim: true,
    },
    craftTechnique: {
      type: String,
      trim: true,
    },
    toolUsage: {
      type: [String],
    },
    handmade: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
    isSigned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isResinCovered: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String,
      enum: ['new', 'resale', 'pre_owned'],
      required: true,
    },
    provenance: {
      type: String,
      trim: true,
    },

  //--------------------------------------------------------Image and Media-----------------------------//
    mainImage: {
      type: String,
      required: true
    },
    otherImages: {
      type: [String],
      default: []
    },
    iframeLink: {
      type: String
    },
    //--------------------------------------------------------Pricing and details-----------------------------------//
    sellingPrice: {
      type: Number,
      required: true,
      min: 0
    },
    marketPrice: {
      type: Number,
      min: 0
    },
    discount: {
      type: Number,
      min: 0,
      max: 100
    },
    finalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    offers: {
      type: [String],
      default: []
    },
    allowInstallments: {
      type: Boolean,
      default: false
    },
    installmentDuration: {
      type: String,
      enum: ['yearly', 'lifetime'],
      default: null
    },
    includeGst: {
      type: Boolean,
      default: false
    },
    gstPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },

    // ------------------------------------------Shipping & Delivery -----------------------------------------------//
    shippingCharges: {
      type: Number,
      required: true,
      min: 0
    },
    handlingTime: {
      type: String,
      required: true,
      trim: true
    },
    estimatedDelivery: {
      type: String,
      required: true,
      trim: true
    },
    packagingType: {
      type: String,
      required: true,
      trim: true
    },
    insuranceCoverage: {
      type: Boolean,
      default: false
    },
    selfShipping: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    hsnCode: {
      type: String,
      trim: true
    },
    surfaceType: {
      type: String
    },
    isSigned: {
      type: Boolean,
      required: true,
      default: false
    },
    condition: {
      type: String,
      enum: ['new', 'resale', 'pre_owned'],
      required: true
    },
    provenance: {
      type: String,
      trim: true
    },
    returnPolicy: {
      type: String,
      enum: ['returnable', 'non-returnable'],
      required: true
    },
    exportRestriction: {
      type: Boolean,
      default: false
    },

    // ------------------------------------------Payout and Details -----------------------------------------------//
    
    autoCancelOrder: {
      type: Boolean,
      default: false
    },
    giftWrapping: {
      type: Boolean,
      default: false
    },
    giftWrappingCustomMessage: {
      type: String,
      trim: true,
      default: ''
    },
    giftWrappingCost: {
      type: Boolean,
      default: false
    },
    giftWrappingCostAmount: {
      type: Number,
      min: 0,
      default: 0
    },

   //------------------------------------Legal & Compliance -------------------------------------------------//
  ownershipConfirmation: {
    type: Boolean,
    required: true,
    default: false
  },
  copyrightRights: {
    type: String,
    enum: ['full_rights', 'personal_use', 'no_rights'],
    required: true
  },
  prohibitedItems: {
    type: Boolean,
    required: true,
    default: false
  },
  artistSignature: {
    type: Boolean,
    required: true,
    default: false
  },
  signatureType: {
    type: String,
    trim: true
  },


  coaAvailable: {
    type: Boolean,
    required: true,
    default: false
  },
  certificateType: {
    type: String,
    enum: ['artist_signed', 'third_party', 'museum', 'gallery']
  },
  issuerName: {
    type: String,
    trim: true
  },
  verificationNumber: {
    type: String,
    trim: true
  },
  certificateFormat: {
    type: String,
    enum: ['digital', 'physical'],
    default: 'digital'
  },


  certificateFile: {
    type: String
  },
  coaFile: {
    type: String
  },

  // License & Usage Rights
commercialUse: {
  type: String,
  enum: ['yes', 'no'],
  default: 'no'
},
  royaltyTerms: {
    type: String,
    trim: true,
    default: ''
  },
  ethicalSourcing: {
    type: Boolean,
    default: false
  },

     // NFT Details 
    blockchainNetwork: {
      type: String,
      trim: true
    },
    smartContractAddress: {
      type: String,
      trim: true
    },
    tokenStandard: {
      type: String,
      trim: true
    },
    tokenId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    walletAddress: {
      type: String,
      trim: true
    },
    royaltyPercentage: {
      type: Number,
      min: 0,
      max: 50,
    },
    mintingType: {
      type: String,
      enum: ['pre_minted', 'lazy']
    },
    licenseType: {
      type: String,
      enum: ['personal', 'limited', 'full', 'exclusive']
    },
    ipfsStorage: {
      type: Boolean,
      default: false
    },
    unlockableContent: {
      type: Boolean,
      default: false
    },
    partOfCollection: {
      type: Boolean,
      default: false
    },
    collectionName: {
      type: String,
      trim: true
    },
    editionSize: {
      type: Number,
      min: 1
    },
    addressLine1: {
      type: String,
      trim: true
    },
    addressLine2: {
      type: String,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    pincode: {
      type: String,
      trim: true
    },
    rarityType: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary']
    },
    traits: {
      type: String,
      trim: true
    },

    // ----------------------------------------Antique & Vintage Details--------------------------------------------//
  originRegion: {
        type: String,
        required: [true, 'Origin/Region is required']
    },
    periodEra: {
        type: String,
        required: [true, 'Period/Era is required']
    },
    antiqueCondition: {
        type: String,
        enum: ['new', 'excellent', 'good', 'fair', 'poor'],
        required: [true, 'Condition is required']
    },
    conservationStatus: {
        type: String,
        enum: ['restored', 'original'],
        required: [true, 'Conservation Status is required']
    },
    restorationHistory: {
        type: String,
        trim: true
    },
    restorationDocumentation: {
        type: String, 
       
    },
    provenanceHistory: {
        type: String,
        trim: true
    },
    culturalSignificance: {
        type: String,
        trim: true
    },
    appraisalDetails: {
        type: String,
        trim: true
    },
    engravingMarkings: {
        type: String,
        trim: true
    },
    patinaWear: {
        type: String,
        trim: true
    },
    isHandmade: {
        type: Boolean,
        default: false,
        required: [true, 'Handmade status is required']
    },
    originalReproduction: {
        type: String,
        enum: ['original', 'replica', 'reproduction'],
        required: [true, 'Original vs Reproduction is required']
    },
    museumExhibitionHistory: {
        type: String,
        trim: true
    },
    maintenanceRequired: {
        type: String,
        enum: ['yes', 'no'],
        required: [true, 'Maintenance requirement is required']
    },
    customEngravingAvailable: {
        type: Boolean,
        default: false
    },
    certification: {
        type: String 
    }
  },
  { timestamps: true }
);

productSchema.index({ createdAt: 1 });
productSchema.index({ medium: 1 });
productSchema.index({ materials: 1 });
productSchema.index({ year: 1 });
productSchema.index({ sellingPrice: 1 });
productSchema.index({ finalPrice: 1 });
productSchema.index({ shippingCharges: 1 });
productSchema.index({ packagingType: 1 });
productSchema.index({ surfaceType: 1 });
productSchema.index({ condition: 1 });
productSchema.index({ isSigned: 1 });
productSchema.index({ ownershipConfirmation: 1 });
productSchema.index({ copyrightRights: 1 });
productSchema.index({ coaAvailable: 1 });

module.exports = mongoose.model('Product', productSchema);