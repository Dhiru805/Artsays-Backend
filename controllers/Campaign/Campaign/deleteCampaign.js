const mongoose = require("mongoose");
const Campaign = require("../../../Models/campaignSchema");

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ hasError: true, message: "Invalid campaign ID" });
    }

    const deletedCampaign = await Campaign.findByIdAndDelete(id);

    if (!deletedCampaign) {
      return res.status(404).json({ hasError: true, message: "Campaign not found" });
    }

    res.status(200).json({
      hasError: false,
      message: "Campaign deleted successfully",
      data: deletedCampaign
    });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({
      hasError: true,
      message: "Server error while deleting campaign"
    });
  }
};

module.exports = deleteCampaign;
