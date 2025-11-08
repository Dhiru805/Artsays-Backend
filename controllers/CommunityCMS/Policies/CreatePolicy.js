const SocialPolicy = require("../../../Models/PolicySchema");

const createPolicy = async (req, res) => {
  try {
    const { question, description, status } = req.body;

    if (!question || !description) {
      return res.status(400).json({
        success: false,
        message: "Question and description are required",
      });
    }

    const policy = new SocialPolicy({
      question,
      description,
      status: status || "draft",
    });

    await policy.save();

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: policy,
    });
  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = createPolicy;
