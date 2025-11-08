const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    faqType: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  }
);

FAQSchema.index(
  { question: 1, faqType: 1 },
  { unique: true }
);

module.exports = mongoose.model("FAQ", FAQSchema);