
const mongoose = require("mongoose");
const Exhibition = require("../../../Models/Exhibition");

const updateExhibitionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid exhibition ID" });
    }

    const { status, rejectComment } = req.body;
    const validStatuses = ["Approved", "Rejected", "Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid exhibition status" });
    }

    if (status === "Rejected" && !rejectComment?.trim()) {
      return res.status(400).json({ success: false, message: "Rejection comment is required for rejected status" });
    }

    const exhibition = await Exhibition.findById(id).populate("userId");

    if (!exhibition) {
      return res.status(404).json({ success: false, message: "Exhibition not found" });
    }

    exhibition.status = status;
    exhibition.rejectComment = status === "Rejected" && rejectComment ? rejectComment.trim() : undefined;

    await exhibition.save();

    res.status(200).json({
      success: true,
      message: "Exhibition status updated successfully",
      exhibition,
    });
  } catch (error) {
    console.error("Error updating exhibition status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating exhibition status",
      error: error.message,
    });
  }
};

module.exports = updateExhibitionStatus;
