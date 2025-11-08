const ContactUs = require("../../../Models/contactus");

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactUs.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, message: "Contact Us page deleted successfully" });
  } catch (error) {
    console.error("Error deleting Contact Us page:", error);
    res.status(500).json({ success: false, message: "Error deleting page" });
  }
};

module.exports = deletePage;
