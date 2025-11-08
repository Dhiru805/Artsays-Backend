// controllers/socialPolicy/getPublishedPolicies.js
const SocialPolicy = require("../../../../Models/PolicySchema");

const GetPublishedPolicies = async (req, res) => {
  try {
    const policies = await SocialPolicy.find({ status: "published" }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: policies });
  } catch (error) {
    console.error("Error fetching published policies:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching published policies" });
  }
};

module.exports = GetPublishedPolicies;
