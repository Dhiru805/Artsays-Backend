// controllers/membership/deleteMembership.js
const Membership = require("../../../../Models/MembershipSchema");

const DeleteMembership = async (req, res) => {
  try {
     const { membershipId } = req.params;
    const { userId } = req.query; 


    if (!membershipId || !userId) {
      return res.status(400).json({
        success: false,
        message: "membershipId and userId are required",
      });
    }

    
    const membership = await Membership.findOne({ _id: membershipId, user: userId });

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found or does not belong to this user",
      });
    }

    await Membership.findByIdAndDelete(membershipId);

    res.status(200).json({
      success: true,
      message: "Membership deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting membership:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = DeleteMembership;
