const mongoose = require("mongoose");

const PeriodEraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PeriodEra = mongoose.model("PeriodEra", PeriodEraSchema);

module.exports = PeriodEra;