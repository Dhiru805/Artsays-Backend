const mongoose = require('mongoose');
const BuyerRequestSchema = new mongoose.Schema(
  {
    orderId: { type: String, default: null, unique: true },
    ProductName: { type: String, required: true },
    Description: { type: String, required: true },
    BuyerImage: { type: String, required: true },
    Buyer: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String },
      email: { type: String }
    },
    Artist: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String }
    },
    ArtType: { type: String, required: true },
    Size: { type: String, required: true },
    ColourPreferences: { type: [String], required: true },
    IsFramed: { type: Boolean, required: true },
    MinBudget: { type: Number, required: true },
    MaxBudget: { type: Number, required: true },
    PaymentTerm: { type: String, required: true },
    InstallmentDuration: { type: Number },
    ExpectedDeadline: { type: Number, required: true },
    Comments: { type: String },
    BuyerSelectedAddress: {
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
      landmark: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },
    OrderStatus: {
      type: String,
      enum: ['Ordered', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Ordered',
    },
    CancelReason: { type: String, default: "" },
    CancelComment: { type: String, default: "" },
    RequestStatus: {
      type: String,
      enum: ['Approved', 'Rejected', 'Pending'],
      default: 'Pending',
    },
    BuyerStatus: {
      type: String,
      enum: ['Approved', 'Rejected', 'Pending'],
      default: 'Pending',
    },
    rejectedcomment: { type: String },
    BuyerNegotiatedBudgets: [{ type: Number, default: [] }],
    ArtistNegotiatedBudgets: [{ type: Number, default: [] }],
    BuyerEstimatedCreationDaysHistory: [{ type: Number, default: [] }],  
    ArtistEstimatedCreationDaysHistory: [{ type: Number, default: [] }], 
    Notes: { type: String, required: false },
    BuyerNotes: { type: String },
    updateCount: { type: Number, default: 0 },
    isUpdated: { type: Number, default: 0 },
    Revisions: [{
      description: String,
      date: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);
module.exports = mongoose.model("BuyerRequest", BuyerRequestSchema);