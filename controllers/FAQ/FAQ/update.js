const mongoose = require("mongoose");
const FAQ = require("../../../Models/FAQ");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, faqType } = req.body;

    const errors = [];

    if (!question || typeof question !== "string" || question.trim() === "") {
      errors.push("Question is required and must be a non-empty string.");
    }

    if (!answer || typeof answer !== "string" || answer.trim() === "") {
      errors.push("Answer is required and must be a non-empty string.");
    }

    if (!faqType || typeof faqType !== "string" || faqType.trim() === "") {
      errors.push("FAQ type is required and must be a non-empty string.");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid FAQ ID is required.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: errors.join(", "),
      });
    }

    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({
        hasError: true,
        message: `FAQ with ID ${id} not found.`,
      });
    }

    faq.question = question.trim();
    faq.answer = answer.trim();
    faq.faqType = faqType.trim();

    await faq.save();

    return res.status(200).json({
      hasError: false,
      message: "FAQ updated successfully.",
      data: faq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An FAQ with the same question already exists in the same FAQ type.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to update FAQ.",
      error: error.message,
    });
  }
};

module.exports = update;