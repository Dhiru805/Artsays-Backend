const ContactUs = require("../../../Models/contactus");

const getPublishedPage = async (req, res) => {
  try {
    const page = await ContactUs.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({ success: false, message: "No published page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Contact Us published page:", error);
    res.status(500).json({ success: false, message: "Error fetching published page" });
  }
};

module.exports = getPublishedPage;
