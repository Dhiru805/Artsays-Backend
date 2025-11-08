const Licensing = require("../../../Models/licensing");

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Licensing.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting Licensing page:", error);
    res.status(500).json({ success: false, message: "Error deleting page" });
  }
};

module.exports = deletePage;
