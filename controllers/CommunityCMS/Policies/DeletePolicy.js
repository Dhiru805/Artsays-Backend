const SocialPolicy = require("../../../Models/PolicySchema");

const deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await SocialPolicy.findByIdAndDelete(id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    res.json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting policy",
      error: error.message,
    });
  }
};

module.exports = deletePolicy;
