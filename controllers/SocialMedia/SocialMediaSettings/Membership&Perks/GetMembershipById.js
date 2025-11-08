const Membership = require("../../../../Models/MembershipSchema");

const getMembershipById = async (req, res) => {
  try {
    const { membershipId } = req.params;

    if (!membershipId) {
      return res.status(400).json({
        success: false,
        message: "membershipId is required",
      });
    }

    const membership = await Membership.findById(membershipId)
      .populate("perks", "perkName")
      .lean();

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Membership fetched successfully",
      membership,
    });
  } catch (error) {
    console.error("Error fetching membership by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = getMembershipById;
