const HowToResell = require("../../../Models/HowToResell");

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HowToResell.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "How To Resell page not found" });
    }

    res.json({ success: true, message: "How To Resell page deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting How To Resell page" });
  }
};

module.exports = deletePage;
