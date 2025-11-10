const mongoose = require("mongoose");

const InsuranceOptionSchema = new mongoose.Schema({
  percentage: {
    type: Number,
    required: true,
    min: [0, "Percentage must be at least 0"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value) || Number(value.toFixed(2)) === value;
      },
      message: "Percentage must be an integer or have at most two decimal places",
    },
  },
  gst: {
    type: Number,
    required: true,
    min: [0, "GST must be at least 0"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value) || Number(value.toFixed(2)) === value;
      },
      message: "GST must be an integer or have at most two decimal places",
    },
  },
});

const InsuranceSettingSchema = new mongoose.Schema(
  {
    mainCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    },
    insuranceName: {
      type: String,
      required: true,
      trim: true,
    },
    oneYear: InsuranceOptionSchema,
    lifeTime: InsuranceOptionSchema,
  },
  { timestamps: true }
);

InsuranceSettingSchema.index(
  { mainCategoryId: 1, insuranceName: 1 },
  { unique: true }
);

module.exports = mongoose.model("InsuranceSetting", InsuranceSettingSchema);