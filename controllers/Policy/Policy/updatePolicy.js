
const mongoose = require("mongoose");
const Policy = require("../../../Models/Policy");

const updatePolicy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { title, description, status } = req.body; 

    const errors = [];

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push("Valid policy ID is required.");
    }
    if (title && (typeof title !== "string" || !title.trim())) {
      errors.push("Title must be a non-empty string.");
    }
    if (status && !["draft", "published", "archived"].includes(status)) {
      errors.push("Status must be 'draft', 'published', or 'archived'.");
    }

    if (errors.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        hasError: true,
        message: errors.join(" "),
      });
    }

    const policy = await Policy.findById(id).session(session);
    if (!policy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        hasError: true,
        message: "Policy not found.",
      });
    }

    policy.title = title ? title.trim() : policy.title;
    policy.description = description !== undefined ? description : policy.description; 
    policy.status = status || policy.status;


    await policy.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      hasError: false,
      message: "Policy updated successfully.",
      data: policy, 
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating policy:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to update policy.",
      error: error.message,
    });
  }
};

module.exports = updatePolicy;

