const Challenge = require("../../../Models/Challenge");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const upload = require("../.././../Middlewares/Multerfile/multerChallengeUpload");

const updateChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
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

    const errors = [];

    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      errors.push("Invalid challenge ID.");
    }

    if (status && !["draft", "live", "closed"].includes(status)) {
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

    if (status !== "draft") {
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
      if (!rules) errors.push("Rules are required")
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(" "),
      });
    }

    const existingChallenge = await Challenge.findById(challengeId);
    if (!existingChallenge) {
      return res.status(404).json({
        hasError: true,
        message: "Challenge not found.",
      });
    }

    const imageBaseUrl = "http://localhost:3001/uploads/ChallengeImages/";
    let bannerImageUrl = existingChallenge.bannerImage;

    if (req.file) {
      if (existingChallenge.bannerImage) {
        const oldImagePath = path.join(__dirname, "../../../uploads/ChallengeImages", existingChallenge.bannerImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      bannerImageUrl = imageBaseUrl + req.file.filename;

      existingChallenge.bannerImage = req.file.filename;
    }

    existingChallenge.title = title || existingChallenge.title;
    existingChallenge.type = type || existingChallenge.type;
    existingChallenge.description = description || existingChallenge.description;
    existingChallenge.startDate = startDate || existingChallenge.startDate;
    existingChallenge.endDate = endDate || existingChallenge.endDate;
    existingChallenge.submissionDeadline = submissionDeadline || existingChallenge.submissionDeadline;
    existingChallenge.entryFee = entryFee || existingChallenge.entryFee;
    existingChallenge.prizeDetails = prizeDetails || existingChallenge.prizeDetails;
    existingChallenge.judgingCriteria = judgingCriteria || existingChallenge.judgingCriteria;
    existingChallenge.maxParticipants = maxParticipants || existingChallenge.maxParticipants;
    existingChallenge.tags = parsedTags.length > 0 ? parsedTags : existingChallenge.tags;
    existingChallenge.status = status || existingChallenge.status;
    existingChallenge.rules = rules || existingChallenge.rules;

    existingChallenge.bannerImage = bannerImageUrl;

    await existingChallenge.save();

    return res.status(200).json({
      hasError: false,
      message: "Challenge updated successfully.",
      data: existingChallenge,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: "Failed to update challenge.",
      error: error.message,
    });
  }
};

module.exports = updateChallenge;
