const mongoose = require('mongoose');

const BiddingPassOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pass: { type: mongoose.Schema.Types.ObjectId, ref: 'BiddingPass', required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BiddingPassOrder', BiddingPassOrderSchema);



