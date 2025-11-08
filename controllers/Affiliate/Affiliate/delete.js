const Affiliate = require("../../../Models/affiliate");

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Affiliate.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, message: "Affiliate page deleted successfully" });
  } catch (error) {
    console.error("Error deleting Affiliate page:", error);
    res.status(500).json({ success: false, message: "Error deleting page" });
  }
};

module.exports = deletePage;
