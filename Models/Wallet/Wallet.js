const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true, unique: true },
  
  balance: { type: Number, default: 0 },
  artCoins: { type: Number, default: 0 },
  pendingWithdrawal: { type: Number, default: 0 },
  escrowHeld: { type: Number, default: 0 },
  currency: { type: String, default: "INR" },
  totalCredited: { type: Number, default: 0 },
  totalDebited: { type: Number, default: 0 },
  lastActivityAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("WalletAmount", WalletSchema);
