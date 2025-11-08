const mongoose = require("mongoose");

const CopyrightsRightsSchema = new mongoose.Schema(
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

const CopyrightsRights = mongoose.model("CopyrightsRights", CopyrightsRightsSchema);

module.exports = CopyrightsRights;