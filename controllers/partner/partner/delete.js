const PartnerPage = require("../../../Models/Partner");

const deletePartnerPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PartnerPage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Partner page not found" });
    }

    res.json({ success: true, message: "Partner page deleted successfully" });
  } catch (error) {
    console.error("Error deleting Partner page:", error);
    res.status(500).json({ success: false, message: "Error deleting page" });
  }
};

module.exports = deletePartnerPage;
