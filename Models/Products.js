const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    //--------------------------------------------------------Basic Details-----------------------------//
    productName: { type: String, trim: true },
    slug: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mainCategory: { type: String, ref: 'MainCategory' },
    category: { type: String, ref: 'Category' },
    subCategory: { type: String, ref: 'SubCategory' },
    productType: { type: [String] },
    editionNumber: { type: Number, min: 1 },
    description: { type: String },
    targetedAudience: { type: String, trim: true },
    inspirationSource: { type: String, trim: true },
    tags: { type: [String], default: [] },

    //--------------------------------------------------------Artwork Details-----------------------------//
    medium: { type: String },
    materials: { type: [String] },
    dimensions: {
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      depth: { type: Number, default: 0 },
    },
    weight: { type: Number, default: 0 },
    printResolution: { type: String, trim: true },
    year: { type: Number },
    editionType: { type: String },

    // Fixed: Enums with safe defaults
    framing: {
      type: String,
    },
    quantity: { type: Number, min: 1, default: 1 },
    hsnCode: { type: String, trim: true },
    surfaceType: { type: String },
    culturalRegion: { type: String },
    biologicalMaterial: { type: String, trim: true },

    functionalUse: {
      type: String,
    },
    materialSource: { type: String, trim: true },
    craftTechnique: { type: String, trim: true },
    toolUsage: { type: [String] },

    handmade: {
      type: String,
    },
    isSigned: { type: Boolean, default: false },
    isResinCovered: { type: Boolean, default: false },

    condition: {
      type: String,
    },
    provenance: { type: String, trim: true },

    //--------------------------------------------------------Image and Media-----------------------------//
    mainImage: { type: String },
    otherImages: { type: [String], default: [] },
    iframeLink: { type: String },

    //--------------------------------------------------------Pricing and details-----------------------------------//
    sellingPrice: { type: Number, min: 0 },
    marketPrice: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    finalPrice: { type: Number, min: 0 },
    allowInstallments: { type: Boolean, default: false },
    installmentDuration: {
      type: String,
      enum: ['Yearly', 'Lifetime', null],
      default: null
    },
    includeGst: { type: Boolean, default: false },
    gstPercentage: { type: Number, min: 0, max: 100, default: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Drafted'],
      default: 'Pending'
    },

    // ------------------------------------------Shipping & Delivery -----------------------------------------------//
    shippingCharges: { type: Number, min: 0, default: 0 },
    handlingTime: { type: String, trim: true },
    estimatedDelivery: { type: String, trim: true },
    packagingType: { type: String, trim: true },
    insuranceCoverage: { type: Boolean, default: false },
    selfShipping: { type: Boolean, default: false },

    returnPolicy: {
      type: String,
      enum: ['Returnable', 'Non-returnable'],
      default: 'Non-returnable'
    },
    exportRestriction: { type: Boolean, default: false },

    // ------------------------------------------Payout and Details -----------------------------------------------//
    autoCancelOrder: { type: Boolean, default: false },
    giftWrapping: { type: Boolean, default: false },
    giftWrappingCustomMessage: { type: String, trim: true, default: '' },
    giftWrappingCost: { type: Boolean, default: false },
    giftWrappingCostAmount: { type: Number, min: 0, default: 0 },

    //------------------------------------Legal & Compliance -------------------------------------------------//
    ownershipConfirmation: { type: Boolean, default: false },

    copyrightRights: {
      type: String,
      default: 'No reproduction/resale rights granted'
    },
    prohibitedItems: { type: Boolean, default: false },
    artistSignature: { type: Boolean, default: false },
    signatureType: { type: String, trim: true },

    coaAvailable: { type: Boolean, default: false },
    certificateType: {
      type: String,
      enum: ['Artist Signed', 'Third-Party Certified', 'Museum-Approved', 'Gallery-Certified']
    },
    issuerName: { type: String, trim: true },
    verificationNumber: { type: String, trim: true },
    certificateFormat: {
      type: String,
      enum: ['digital', 'physical'],
      default: 'digital'
    },

    certificateFile: { type: String },
    coaFile: { type: String },

    // License & Usage Rights
    commercialUse: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'No'
    },
    royaltyTerms: { type: String, trim: true, default: '' },
    ethicalSourcing: { type: Boolean, default: false },

    // NFT Details 
    blockchainNetwork: { type: String, trim: true },
    smartContractAddress: { type: String, trim: true },
    tokenStandard: { type: String, trim: true },
    tokenId: { type: String, trim: true, unique: true },
    walletAddress: { type: String, trim: true },
    royaltyPercentage: { type: Number, min: 0, max: 50 },
    mintingType: { type: String, enum: ['pre_minted', 'lazy'] },
    licenseType: { type: String, enum: ['personal', 'limited', 'full', 'exclusive'] },
    ipfsStorage: { type: Boolean, default: false },
    ipfsLink: {
      type: String,
      trim: true,
      default: null
    },
    softwareVersion: {
      type: String,
      trim: true
    },
    fileFormat: {
      type: String,
      trim: true
    },

    unlockableContent: { type: Boolean, default: false },

    unlockableContentLink: {
      type: String,
      trim: true,
      default: null
    },
    partOfCollection: { type: Boolean, default: false },
    collectionName: { type: String, trim: true },

    editionSize: {
      type: Number,
      min: 1,
      default: 1
    },

    // Address
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    landmark: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pincode: { type: String, trim: true },

    rarityType: { type: String, enum: ['common', 'rare', 'epic', 'legendary'] },
    traits: { type: String, trim: true },

    // ----------------------------------------Antique & Vintage Details--------------------------------------------//
    originRegion: { type: String },
    periodEra: { type: String },
    antiqueCondition: { type: String, enum: ['new', 'excellent', 'good', 'fair', 'poor'] },
    conservationStatus: { type: String, enum: ['restored', 'original'] },
    restorationHistory: { type: String, trim: true },
    restorationDocumentation: { type: String },
    provenanceHistory: { type: String, trim: true },
    culturalSignificance: { type: String, trim: true },
    appraisalDetails: { type: String, trim: true },
    engravingMarkings: { type: String, trim: true },
    patinaWear: { type: String, trim: true },
    isHandmade: { type: Boolean, default: false },
    originalReproduction: { type: String, enum: ['original', 'replica', 'reproduction'] },
    museumExhibitionHistory: { type: String, trim: true },
    maintenanceRequired: { type: String, enum: ['yes', 'no'] },
    customEngravingAvailable: { type: Boolean, default: false },
    certification: { type: String }
  },
  { timestamps: true }
);


productSchema.pre('save', function (next) {
  if (this.productName && !this.slug) {
    this.slug = this.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});


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