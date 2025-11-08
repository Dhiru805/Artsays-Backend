const Enquiry = require("../../../Models/enquiry");

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    await Enquiry.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteEnquiry;
