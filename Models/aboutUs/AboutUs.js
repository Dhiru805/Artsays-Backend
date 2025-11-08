const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },          
    status: { type: String, enum: ["draft", "published"], default: "draft" },

    // Sections references
    whoWeAre: { type: mongoose.Schema.Types.ObjectId, ref: "WhoWeAre" },
    whatWeDo: { type: mongoose.Schema.Types.ObjectId, ref: "WhatWeDo" },
    missionVision: { type: mongoose.Schema.Types.ObjectId, ref: "MissionVision" },
    ourValues: { type: mongoose.Schema.Types.ObjectId, ref: "OurValues" },
    deliveryProcess: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryProcess" },
    meetTeam: { type: mongoose.Schema.Types.ObjectId, ref: "MeetTeam" },
    testimonials: { type: mongoose.Schema.Types.ObjectId, ref: "Testimonials" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
