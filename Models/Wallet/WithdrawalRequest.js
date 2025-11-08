const mongoose = require("mongoose");

const WithdrawalRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["upi", "bank"], default: "upi" },
  destination: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ["pending", "approved", "declined", "paid"], default: "pending", index: true },
  adminNote: { type: String },
  processedAt: { type: Date },
  referenceId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("WalletWithdrawalRequest", WithdrawalRequestSchema);



