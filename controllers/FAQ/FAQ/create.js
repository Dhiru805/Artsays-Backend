const mongoose = require("mongoose");
const FAQ = require("../../../Models/FAQ");

const create = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const validateFAQ = (entry) => {
      const errors = [];

      if (!entry.question || typeof entry.question !== "string" || entry.question.trim() === "") {
        errors.push("Question is required and must be a non-empty string.");
      }

      if (!entry.answer || typeof entry.answer !== "string" || entry.answer.trim() === "") {
        errors.push("Answer is required and must be a non-empty string.");
      }

      if (!entry.faqType || typeof entry.faqType !== "string" || entry.faqType.trim() === "") {
        errors.push("FAQ type is required and must be a non-empty string.");
      }

      return errors;
    };

    for (const entry of data) {
      const errors = validateFAQ(entry);
      if (errors.length > 0) {
        return res.status(400).json({
          hasError: true,
          message: errors.join(", "),
        });
      }
    }

    const createdFAQs = [];

    for (const entry of data) {
      const newFAQ = new FAQ({
        question: entry.question.trim(),
        answer: entry.answer.trim(),
        faqType: entry.faqType.trim(),
      });

      await newFAQ.save();
      createdFAQs.push(newFAQ);
    }

    return res.status(201).json({
      hasError: false,
      message: "FAQ(s) created successfully.",
      data: createdFAQs,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "An FAQ with the same question already exists in the same FAQ type.",
      });
    }
    return res.status(500).json({
      hasError: true,
      message: "Failed to create FAQ.",
      error: error.message,
    });
  }
};

module.exports = create;