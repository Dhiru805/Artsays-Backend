// const mongoose = require('mongoose');

// const shippingAddressSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: [true, 'Product ID is required'],
//       index: true
//     },
//     addressLine1: {
//       type: String,
//       trim: true,
//       required: [true, 'Address Line 1 is required']
//     },
//     addressLine2: {
//       type: String,
//       trim: true
//     },
//     landmark: {
//       type: String,
//       trim: true
//     },
//     city: {
//       type: String,
//       trim: true,
//       required: [true, 'City is required']
//     },
//     state: {
//       type: String,
//       trim: true,
//       required: [true, 'State is required']
//     },
//     country: {
//       type: String,
//       trim: true,
//       required: [true, 'Country is required']
//     },
//     pincode: {
//       type: String,
//       trim: true,
//       required: [true, 'Pincode is required']
//     },
//     isDefault: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { timestamps: true }
// );

// shippingAddressSchema.pre('save', async function (next) {
//   if (this.isDefault) {
//     await this.constructor.updateMany(
//       { productId: this.productId, _id: { $ne: this._id }, isDefault: true },
//       { $set: { isDefault: false } }
//     );
//   }
//   next();
// });

// // Index for efficient querying
// shippingAddressSchema.index({ productId: 1, isDefault: 1 });

// module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressLine1: {
      type: String,
      trim: true,
      required: [true, "Address Line 1 is required"],
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      trim: true,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },
    pincode: {
      type: String,
      trim: true,
      required: [true, "Pincode is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
