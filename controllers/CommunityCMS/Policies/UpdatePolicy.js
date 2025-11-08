const SocialPolicy = require("../../../Models/PolicySchema");

const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, description, status } = req.body;

    const policy = await SocialPolicy.findByIdAndUpdate(
      id,
      { question, description, status },
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({ success: false, message: "Policy not found" });
    }

    res.json({ success: true, message: "Policy updated successfully", data: policy });
  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ success: false, message: "Error updating policy" });
  }
};

module.exports = updatePolicy;
