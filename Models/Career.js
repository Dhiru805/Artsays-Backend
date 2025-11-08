const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Job category is required"],
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
    },
    workMode: {
      type: String,
      required: [true, "Work mode is required"],
      enum: ["On-site", "Remote", "Hybrid"],
    },
    location: {
      type: String,
      required: [function () { return this.workMode !== "Remote"; }, "Location is required for non-remote jobs"],
      trim: true,
      default: function () { return this.workMode === "Remote" ? "Remote" : null; },
    },
    summary: {
      type: String,
      required: [true, "Job summary is required"],
      trim: true,
    },
    rolesResponsibilities: {
      type: String,
      required: [true, "Roles and responsibilities are required"],
    },
    requiredSkills: {
      type: [String],
      required: [true, "At least one required skill is needed"],
    },
    preferredSkills: {
      type: [String],
      required: [true, "At least one preferred skill is needed"],
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      trim: true,
    },
    education: {
      type: [String],
      required: [true, "At least one education requirement is needed"],
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    publishDate: {
      type: Date,
      required: [true, "Publish date is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Open", "Closed", "Draft", "Paused"],
    },
  },
  { timestamps: true }
);

careerSchema.index({ jobTitle: 1, department: 1 }, { unique: true });

module.exports = mongoose.model("Career", careerSchema);