// controllers/membership/getMemberships.js
const Membership = require("../../../../Models/MembershipSchema");

const GetMembership = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const memberships = await Membership.find({ user: userId })
      .populate("perks", "perkName") // ✅ get perk names
      .lean();

    res.status(200).json({
      success: true,
      message: "Memberships fetched successfully",
      memberships,
    });
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = GetMembership;
