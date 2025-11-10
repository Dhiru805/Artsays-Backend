const mongoose = require('mongoose');

const defaultShippingAddressSchema = new mongoose.Schema(
  {
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      index: true
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Address ID is required']
    },
    isDefault: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

defaultShippingAddressSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { productId: this.productId, _id: { $ne: this._id }, isDefault: true },
      { $set: { isDefault: false } }
    );
  }
  next();
});

defaultShippingAddressSchema.index({ productId: 1 }, { unique: true });

module.exports = mongoose.model('DefaultShippingAddress', defaultShippingAddressSchema);