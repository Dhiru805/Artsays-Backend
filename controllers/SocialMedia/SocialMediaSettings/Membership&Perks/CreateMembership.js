// controllers/membership/createMembership.js
const Membership = require("../../../../Models/MembershipSchema");

const CreateMembership = async (req, res) => {
  try {
    const { userId, title, price, perks } = req.body;

    if (!userId || !title || !price) {
      return res.status(400).json({
        success: false,
        message: "userId, title, and price are required",
      });
    }

    const membership = new Membership({
      user: userId,
      title,
      price,
      perks, 
    });

    await membership.save();

    res.status(201).json({
      success: true,
      message: "Membership created successfully",
      membership,
    });
  } catch (error) {
    console.error("Error creating membership:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = CreateMembership;
