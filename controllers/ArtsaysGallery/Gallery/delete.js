const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

const deleteArtsaysGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ArtsaysGallery.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Gallery entry not found" });
    }

    res.json({ success: true, message: "Gallery entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery entry:", error);
    res.status(500).json({ success: false, message: "Error deleting gallery entry" });
  }
};

module.exports = deleteArtsaysGallery;
