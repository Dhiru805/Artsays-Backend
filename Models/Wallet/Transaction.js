const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  artCoinsEarned: { type: Number, default: 10 },
  status: { type: String, enum: ["success", "pending", "failed"], default: "success" },
  source: { type: String, enum: ["payment_gateway", "wallet", "admin_adjustment", "escrow", "refund", "reward"], default: "wallet" },
  referenceId: { type: String },
  balanceAfter: { type: Number },
  metadata: { type: Object },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("WalletTransaction", TransactionSchema);
