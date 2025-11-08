const mongoose = require("mongoose");
 
const PredefinedPerksSchema = new mongoose.Schema({
  perkName: {
    type: String,
    required: true,
    unique: true,
  },
});
 
PredefinedPerksSchema.statics.seedDefaults = async function () {
  const defaultPerks = [
    "VIP access for live stream",
    "VIP access for live option",
    "Exclusive discount",
    "Exclusive content access",
    "Priorty recognition from artist",
    "Exclusive freebies on first order", 
    "Pre-order window for products",
    "Exclusive live stream workshop access",
    "Special discount coupon for product orders" ,
    "Post collaboration",
  ];
 
  for (const perk of defaultPerks) {
    await this.updateOne(
      { perkName: perk },
      { perkName: perk },
      { upsert: true } // create if not exists
    );
  }
  console.log(" Default perks ensured in DB");
};
 
const PredefinedPerks = mongoose.model("PredefinedPerks", PredefinedPerksSchema);
 

PredefinedPerks.seedDefaults().catch((err) =>
  console.error(" Error seeding perks:", err)
);
 
module.exports = PredefinedPerks;