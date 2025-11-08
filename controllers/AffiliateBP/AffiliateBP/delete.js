const AffiliateBP = require("../../../Models/affiliatebp");

const deletePageBP = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AffiliateBP.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, message: "Affiliate BP page deleted successfully" });
  } catch (error) {
    console.error("Error deleting Affiliate BP page:", error);
    res.status(500).json({ success: false, message: "Error deleting page" });
  }
};

module.exports = deletePageBP;
