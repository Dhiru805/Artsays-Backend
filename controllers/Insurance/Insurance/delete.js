const InsurancePage = require("../../../Models/Insurance");

const deleteInsurancePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await InsurancePage.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Insurance page not found" });
    }

    res.json({
      success: true,
      message: "Insurance page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Insurance page:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting page",
    });
  }
};

module.exports = deleteInsurancePage;
