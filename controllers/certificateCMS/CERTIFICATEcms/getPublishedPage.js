const Certification = require("../../../Models/certificateCMS");

const getPublishedPage = async (req, res) => {
  try {
    const page = await Certification.findOne({ status: "published" }).sort({
      createdAt: -1,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "No published certification page found",
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Certification published page:", error);
    res.status(500).json({ success: false, message: "Error fetching page" });
  }
};

module.exports = getPublishedPage;
