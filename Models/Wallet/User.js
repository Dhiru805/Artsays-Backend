const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Buyer", "Artist", "Seller"], default: "Buyer" },
});

module.exports = mongoose.model("WalletUser", UserSchema);
