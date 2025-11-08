
const mongoose = require("mongoose");
const Policy = require("../../../Models/Policy");

const createPolicy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, description = '', status = 'draft', userId } = req.body;

    const errors = [];
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) errors.push("Valid user ID required.");
    if (!title || !title.trim()) errors.push("Title is required.");
    //if (status && !["draft", "published"].includes(status)) errors.push("Status must be 'draft' or 'published'.");
   if (status && !["draft", "published", "archived"].includes(status)) {errors.push("Status must be 'draft', 'published', or 'archived'.");}

    if (errors.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ hasError: true, message: errors.join(" ") });
    }

    const newPolicy = new Policy({
      title: title.trim(),
      description,
      status,
      userId
    });

    newPolicy.$session(session);
    await newPolicy.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      hasError: false,
      message: "Policy created successfully.",
      data: newPolicy
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating policy:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to create policy.",
      error: error.message
    });
  }
};

module.exports = createPolicy;

