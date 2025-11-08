const Challenge = require("../../../Models/Challenge");
const mongoose = require("mongoose");
const path = require("path");

const upload = require("../.././../Middlewares/Multerfile/multerChallengeUpload");

const createChallenge = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      startDate,
      endDate,
      submissionDeadline,
      entryFee,
      prizeDetails,
      judgingCriteria,
      maxParticipants,
      tags,
      status,
      rules
    } = req.body;

    const userId = req.params.userId;

    const errors = [];

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errors.push("Invalid user ID.");
    }

    if (!status || !["draft", "live", "closed"].includes(status)) {
      errors.push("Valid status is required.");
    }

    let parsedTags = [];
    if (typeof tags === "string") {
      parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    } else if (Array.isArray(tags)) {
      parsedTags = tags.map((tag) => tag.trim()).filter((tag) => tag);
    }

    const isDraft = status === "draft";
    if (!isDraft) {
      if (!title) errors.push("Title is required.");
      if (!type) errors.push("Theme type is required.");
      if (!description) errors.push("Description is required.");
      if (!startDate) errors.push("Start date is required.");
      if (!endDate) errors.push("End date is required.");
      if (!submissionDeadline) errors.push("Submission deadline is required.");
      if (!entryFee) errors.push("Entry fee is required.");
      if (!prizeDetails) errors.push("Prize details are required.");
      if (!judgingCriteria) errors.push("Judging criteria is required.");
      if (parsedTags.length === 0) errors.push("At least one tag is required.");
      if (!req.file) errors.push("Banner image is required.");
      if (!rules) errors.push("Rules are required")
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(" "),
      });
    }

    let bannerImageUrl = null;
    if (req.file) {
      const imageBaseUrl = "http://localhost:3001/uploads/ChallengeImages/";
      bannerImageUrl = imageBaseUrl + req.file.filename;
    }

    const newChallenge = new Challenge({
      userId,
      title: title || null,
      type: type || null,
      description: description || null,
      startDate: startDate || null,
      endDate: endDate || null,
      submissionDeadline: submissionDeadline || null,
      entryFee: entryFee || null,
      prizeDetails: prizeDetails || null,
      judgingCriteria: judgingCriteria || null,
      maxParticipants: maxParticipants || null,
      tags: parsedTags,
      bannerImage: bannerImageUrl,
      status,
      rules
    });

    await newChallenge.save();

    return res.status(201).json({
      hasError: false,
      message: "Challenge created successfully.",
      data: newChallenge,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: "Failed to create challenge.",
      error: error.message,
    });
  }
};

module.exports = createChallenge;
