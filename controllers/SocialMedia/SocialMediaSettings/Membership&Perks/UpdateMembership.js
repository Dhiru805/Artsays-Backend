// controllers/membership/updateMembership.js
const Membership = require("../../../../Models/MembershipSchema");

const UpdateMembership = async (req, res) => {
  try {
    const { membershipId } = req.params;
    const { userId, title, price, perks } = req.body; // perks = array of predefined perk IDs

    //  Validate
    if (!membershipId || !userId) {
      return res.status(400).json({
        success: false,
        message: "membershipId and userId are required",
      });
    }

    // Check if membership belongs to this user
    const membership = await Membership.findOne({ _id: membershipId, user: userId });
    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found or does not belong to this user",
      });
    }

    //  Update fields only if provided
    if (title) membership.title = title;
    if (price) membership.price = price;
    if (perks && Array.isArray(perks)) membership.perks = perks;

    await membership.save();

    res.status(200).json({
      success: true,
      message: "Membership updated successfully",
      membership,
    });
  } catch (error) {
    console.error("Error updating membership:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = UpdateMembership;
