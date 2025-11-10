const Joi = require('joi');
const mongoose = require('mongoose');

const productValidator = Joi.object({
  // --------------------------- BASIC ---------------------------
  productName: Joi.string().trim().required().messages({
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required',
  }),

  userId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.required': 'User ID is required',
      'any.invalid': 'Invalid User ID format',
    }),

  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),

  targetedAudience: Joi.string().trim().required().messages({
    'string.empty': 'Targeted audience is required',
    'any.required': 'Targeted audience is required',
  }),

  inspirationSource: Joi.string().trim().required().messages({
    'string.empty': 'Inspiration source is required',
    'any.required': 'Inspiration source is required',
  }),

  tags: Joi.array().items(Joi.string()).default([]),

  // --------------------------- CATEGORIES ---------------------------
  mainCategory: Joi.string().required().messages({
    'any.required': 'Main category is required',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Category is required',
  }),
  subCategory: Joi.string().required().messages({
    'any.required': 'Sub-category is required',
  }),

  productType: Joi.string().required().messages({
    'any.required': 'Product type is required',
  }),

  editionNumber: Joi.when('productType', {
    is: 'Limited',
    then: Joi.number().integer().min(1).required().messages({
      'number.min': 'Edition number must be at least 1',
      'any.required': 'Edition number is required for limited edition',
    }),
    otherwise: Joi.number().integer().min(1).optional(),
  }),

  // --------------------------- ARTWORK ---------------------------
  medium: Joi.string().required().messages({
    'any.required': 'Medium is required',
  }),

  // materials:  Joi.array().min(1)
  //   .required()
  //   .messages({
  //     'array.min': 'At least one material is required',
  //     'any.required': 'Materials are required',
  //   }),

  materials: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string()).min(1),
      Joi.string()
    )
    .custom((value) => {
      if (typeof value === 'string') return [value];
      return value;
    })
    .messages({
      'array.min': 'At least one material is required',
      'any.required': 'Materials are required',
    })
    .required(),


  width: Joi.string()
    .required()
    .custom((v, h) => {
      const n = parseFloat(v);
      if (isNaN(n) || n <= 0) return h.error('number.base');
      return n;
    })
    .messages({
      'any.required': 'Width is required',
      'number.base': 'Width must be a positive number',
    }),

  height: Joi.string()
    .required()
    .custom((v, h) => {
      const n = parseFloat(v);
      if (isNaN(n) || n <= 0) return h.error('number.base');
      return n;
    })
    .messages({
      'any.required': 'Height is required',
      'number.base': 'Height must be a positive number',
    }),

  depth: Joi.string()
    .required()
    .custom((v, h) => {
      const n = parseFloat(v);
      if (isNaN(n) || n < 0) return h.error('number.base');
      return n;
    })
    .messages({
      'any.required': 'Depth is required',
      'number.base': 'Depth must be a non-negative number',
    }),

  weight: Joi.number().min(0).optional(),

  printResolution: Joi.string()
    .trim()
    .allow('')
    .when('medium', {
      is: Joi.string().valid('print', 'poster', 'Print and Poster').insensitive(),
      then: Joi.required().messages({
        'any.required': 'Print resolution is required for print/poster or Print and Poster ',
      }),
    }),

  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.min': 'Year must be 1900 or later',
      'number.max': 'Year cannot be in the future',
      'any.required': 'Year is required',
    }),

  editionType: Joi.string().required(),

  framing: Joi.string()
    .required()
    .messages({
      'any.only': 'Invalid framing option',
      'any.required': 'Framing is required',
    }),

  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),

  hsnCode: Joi.string().trim().allow(''),
  surfaceType: Joi.string().trim().allow(''),
  culturalRegion: Joi.string().trim().allow(''),
  biologicalMaterial: Joi.string().trim().allow(''),

  functionalUse: Joi.string()
    .required()
    .messages({
      'any.only': 'Functional use must be yes/no',
      'any.required': 'Functional use is required',
    }),

  materialSource: Joi.string().trim().allow(''),
  craftTechnique: Joi.string().trim().allow(''),
  toolUsage: Joi.array().items(Joi.string()).default([]),

  handmade: Joi.string()
    .required()
    .messages({
      'any.only': 'Handmade must be yes/no',
      'any.required': 'Handmade status is required',
    }),

  isSigned: Joi.boolean().required(),
  isResinCovered: Joi.boolean().default(false),

  condition: Joi.string()
    .required()
    .messages({
      'any.only': 'Invalid condition',
      'any.required': 'Condition is required',
    }),

  provenance: Joi.string()
    .trim()
    .allow('')
    .when('condition', {
      is: 'Resale',
      then: Joi.required().messages({
        'any.required': 'Provenance is required for resale',
      }),
    }),

  // --------------------------- IMAGES ---------------------------
  iframeLink: Joi.string().allow(''),
  mainImage: Joi.string(),
  otherImages: Joi.array().items(Joi.string()).default([]),

  // --------------------------- PRICING ---------------------------
  sellingPrice: Joi.number().min(0).required(),
  marketPrice: Joi.number().min(0).optional(),
  discount: Joi.number().min(0).max(100).optional(),
  finalPrice: Joi.number().min(0).optional(),

  allowInstallments: Joi.boolean().default(false),
  installmentDuration: Joi.when('allowInstallments', {
    is: true,
    then: Joi.string().valid('Yearly', 'Lifetime').required(),
    otherwise: Joi.forbidden(),
  }),

  includeGst: Joi.boolean().default(false),
  gstPercentage: Joi.number().min(0).max(100).default(0),

  status: Joi.string()
    .valid('Pending', 'Approved', 'Rejected', 'Drafted')
    .default('Pending'),

  // --------------------------- SHIPPING ---------------------------
  shippingCharges: Joi.number().min(0).required(),
  handlingTime: Joi.string().required(),
  estimatedDelivery: Joi.string().required(),
  packagingType: Joi.string().required(),
  insuranceCoverage: Joi.boolean().default(false),
  selfShipping: Joi.boolean().default(false),

  returnPolicy: Joi.string()
    .valid('Returnable', 'Non-returnable')
    .required(),

  exportRestriction: Joi.boolean().default(false),

  // --------------------------- PAYOUT ---------------------------
  autoCancelOrder: Joi.boolean().default(false),
  giftWrapping: Joi.boolean().default(false),
  giftWrappingCustomMessage: Joi.string().trim().allow('').default(''),
  giftWrappingCost: Joi.boolean().default(false),
  giftWrappingCostAmount: Joi.when('giftWrappingCost', {
    is: true,
    then: Joi.number().min(0).required(),
    otherwise: Joi.number().min(0).default(0),
  }),

  // --------------------------- LEGAL ---------------------------
  ownershipConfirmation: Joi.boolean().required(),
  copyrightRights: Joi.string()
    .valid('Buyer has full reproduction/resale rights', 'Buyer can use personally but not reproduce/resell', 'No reproduction/resale rights granted')
    .required(),

  prohibitedItems: Joi.boolean().required(),
  artistSignature: Joi.boolean().required(),
  signatureType: Joi.string().trim().allow(''),

  coaAvailable: Joi.boolean().required(),
  certificateType: Joi.when('coaAvailable', {
    is: true,
    then: Joi.string()
      .valid('Artist Signed',
        'Third-Party Certified',
        'Museum-Approved',
        'Gallery-Certified')
      .required(),
  }),
  issuerName: Joi.when('coaAvailable', { is: true, then: Joi.string().required() }),
  verificationNumber: Joi.when('coaAvailable', {
    is: true,
    then: Joi.string().required(),
  }),
  certificateFormat: Joi.string().valid('digital', 'physical').default('digital'),

  certificateFile: Joi.string(),
  coaFile: Joi.string(),

  commercialUse: Joi.string().valid('Yes', 'No').default('No'),
  royaltyTerms: Joi.string().trim().allow(''),
  ethicalSourcing: Joi.boolean().default(false),

  // --------------------------- NFT ---------------------------
  blockchainNetwork: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  smartContractAddress: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  tokenStandard: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  tokenId: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  walletAddress: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  royaltyPercentage: Joi.when('productType', {
    is: 'nft',
    then: Joi.number().min(0).max(50).required(),
    otherwise: Joi.number().min(0).max(50).optional(),
  }),
  mintingType: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().valid('pre_minted', 'lazy').required(),
    otherwise: Joi.string().allow(''),
  }),
  licenseType: Joi.when('productType', {
    is: 'nft',
    then: Joi.string()
      .valid('personal', 'limited', 'full', 'exclusive')
      .required(),
    otherwise: Joi.string().allow(''),
  }),

  ipfsStorage: Joi.boolean().default(false),
  // --------------------------- IPFS CONDITIONAL ---------------------------
  ipfsLink: Joi.when('ipfsStorage', {
    is: true,
    then: Joi.string().trim().required()
      .messages({ 'string.uri': 'IPFS link must be a valid ' }),
    otherwise: Joi.string().trim().allow('').optional(),
  }),

  softwareVersion: Joi.when('ipfsStorage', {
    is: true,
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow('').optional(),
  }),

  fileFormat: Joi.when('ipfsStorage', {
    is: true,
    then: Joi.string().trim().uppercase().required(),
    otherwise: Joi.string().trim().allow('').optional(),
  }),

  unlockableContent: Joi.boolean().default(false),

  // --------------------------- UNLOCKABLE CONTENT ---------------------------
  unlockableContentLink: Joi.when('unlockableContent', {
    is: true,
    then: Joi.string().trim().required()
      .messages({ 'string.uri': 'Unlockable content link must be a valid' }),
    otherwise: Joi.string().trim().allow('').optional(),
  }),
  partOfCollection: Joi.boolean().default(false),
  collectionName: Joi.when('partOfCollection', {
    is: true,
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),
  editionSize: Joi.when('partOfCollection', {
    is: true,
    then: Joi.number().integer().min(1).required(),
    otherwise: Joi.number().integer().min(1).optional(),
  }),
  rarityType: Joi.when('productType', {
    is: 'nft',
    then: Joi.string()
      .valid('common', 'rare', 'epic', 'legendary')
      .required(),
    otherwise: Joi.string().allow(''),
  }),
  traits: Joi.when('productType', {
    is: 'nft',
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().allow(''),
  }),

  // --------------------------- ANTIQUES ---------------------------
  originRegion: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string()
      .valid('france', 'japan', 'india', 'china', 'uk', 'usa')
      .required(),
    otherwise: Joi.string().allow(''),
  }),
  periodEra: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string().optional(),
    otherwise: Joi.string().allow(''),
  }),
  antiqueCondition: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string()
      .valid('new', 'excellent', 'good', 'fair', 'poor')
      .optional(),
    otherwise: Joi.string().allow(''),
  }),
  conservationStatus: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string().valid('restored', 'original').optional(),
    otherwise: Joi.string().allow(''),
  }),

  restorationHistory: Joi.string().trim().allow(''),
  restorationDocumentation: Joi.string().trim().allow(''),
  provenanceHistory: Joi.string().trim().allow(''),
  culturalSignificance: Joi.string().trim().allow(''),
  appraisalDetails: Joi.string().trim().allow(''),
  engravingMarkings: Joi.string().trim().allow(''),
  patinaWear: Joi.string().trim().allow(''),

  isHandmade: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.boolean().required(),
    otherwise: Joi.boolean().default(false),
  }),
  originalReproduction: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string()
      .valid('original', 'replica', 'reproduction')
      .required(),
    otherwise: Joi.string().allow(''),
  }),
  museumExhibitionHistory: Joi.string().trim().allow(''),
  maintenanceRequired: Joi.when('mainCategory', {
    is: 'Antiques & Vintage',
    then: Joi.string().valid('yes', 'no').required(),
    otherwise: Joi.string().allow(''),
  }),
  customEngravingAvailable: Joi.boolean().default(false),
  certification: Joi.string().trim().allow(''),

  // --------------------------- ADDRESS ---------------------------
  addressLine1: Joi.string().trim().allow(''),
  addressLine2: Joi.string().trim().allow(''),
  landmark: Joi.string().trim().allow(''),
  city: Joi.string().trim().allow(''),
  state: Joi.string().trim().allow(''),
  country: Joi.string().trim().allow(''),
  pincode: Joi.string().trim().allow(''),
}).options({ stripUnknown: true });

module.exports = productValidator;