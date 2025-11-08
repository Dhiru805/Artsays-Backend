
const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: "month" }, // e.g., per month
   perks: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PredefinedPerks", // ✅ match model name
  },
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", MembershipSchema);
