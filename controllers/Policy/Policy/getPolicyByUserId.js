
const Policy = require("../../../Models/Policy");

const getPoliciesByUserId = async (req, res) => {
  try {
    const policies = await Policy.find().select("-__v").lean(); 

    if (!policies || policies.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No policies found.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Policies retrieved successfully.",
      data: policies, 
    });
  } catch (error) {
    console.error("Error retrieving policies:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve policies.",
      error: error.message,
    });
  }
};

module.exports = getPoliciesByUserId;
