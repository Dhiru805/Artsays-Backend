
const HowToSell = require("../../../Models/HowToSell");

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HowToSell.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "How To Sell page not found" });
    }

    res.json({ success: true, message: "How To Sell page deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting How To Sell page" });
  }
};

module.exports = deletePage;
