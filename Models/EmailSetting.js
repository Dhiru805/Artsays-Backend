const mongoose = require("mongoose");

const emailSettingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "singleton", 
  },
  mailDriver: {
    type: String,
    required: true,
  },
  mailPort: {
    type: String,
    required: true,
  },
  mailHost: {
    type: String,
    required: true,
  },
  mailUsername: {
    type: String,
    required: true,
  },
  mailPassword: {
    type: String,
    required: true,
  },
  mailEncryption: {
    type: String,
    required: true,
  },
  mailFromAddress: {
    type: String,
    required: true,
  },
  mailFromName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); 




emailSettingSchema.pre("find", function (next) {
  if (!this.getOptions().bypassActiveCheck) {
    this.where({ isActive: true });
  }
  next();
});

emailSettingSchema.pre("findOne", function (next) {
  if (!this.getOptions().bypassActiveCheck) {
    this.where({ isActive: true });
  }
  next();
});

const EmailSetting = mongoose.model("EmailSetting", emailSettingSchema);

module.exports = EmailSetting;