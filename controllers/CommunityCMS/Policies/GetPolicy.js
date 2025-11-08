const SocialPolicy = require("../../../Models/PolicySchema");

const getPolicies = async (req, res) => {
  try {
    const policies = await SocialPolicy.find().sort({ createdAt: -1 });
    res.json({ success: true, data: policies });
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ success: false, message: "Error fetching policies" });
  }
};

const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await SocialPolicy.findById(id);

    if (!policy) {
      return res.status(404).json({ success: false, message: "Policy not found" });
    }

    res.json({ success: true, data: policy });
  } catch (error) {
    console.error("Error fetching policy:", error);
    res.status(500).json({ success: false, message: "Error fetching policy" });
  }
};

module.exports = { getPolicies, getPolicyById };
