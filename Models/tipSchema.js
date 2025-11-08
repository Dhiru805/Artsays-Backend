const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // who paid

    receiver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // post owner

    post: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Post", 
      required: true 
    }, // tipped post

    amount: { 
      type: Number, 
      required: true, 
      min: 40, 
      max: 1440 
    },

    status: { 
      type: String, 
      enum: ["pending", "success", "failed"], 
      default: "success" 
    },

    // ✅ optional for financial tracking
    transactionId: { type: String }, // e.g., Razorpay/Stripe ID
    paymentMethod: { type: String, enum: ["wallet", "upi", "card", "paypal"], default: "wallet" },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", TipSchema);
