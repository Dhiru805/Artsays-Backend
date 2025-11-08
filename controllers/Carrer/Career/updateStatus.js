const mongoose = require("mongoose");
const Career = require("../../../Models/Career");

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ hasError: true, message: "Invalid career ID." });
    }

    const validStatuses = ["Open", "Closed", "Paused", "Draft"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        hasError: true,
        message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCareer) {
      return res.status(404).json({ hasError: true, message: "Career not found." });
    }

    return res.status(200).json({
      hasError: false,
      message: "Status updated successfully.",
      data: updatedCareer,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      hasError: true,
      message: "Something went wrong while updating the status.",
    });
  }
};

module.exports = updateStatus;
