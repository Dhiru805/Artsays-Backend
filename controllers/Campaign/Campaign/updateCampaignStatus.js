const mongoose = require("mongoose");
const Campaign = require("../../../Models/campaignSchema");

const updateCampaignStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ hasError: true, message: "Invalid campaign ID" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { status: "closed" },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ hasError: true, message: "Campaign not found" });
    }

    res.status(200).json({
      hasError: false,
      message: "Campaign closed successfully",
      data: updatedCampaign
    });
  } catch (error) {
    console.error("Error closing campaign:", error);
    res.status(500).json({
      hasError: true,
      message: "Server error while closing campaign"
    });
  }
};

module.exports = updateCampaignStatus;
