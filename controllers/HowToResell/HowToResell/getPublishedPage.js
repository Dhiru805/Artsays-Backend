const HowToResell = require("../../../Models/HowToResell");

const getPublishedPage = async (req, res) => {
  try {
    
    const page = await HowToResell.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({ success: false, message: "No published How To Resell page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching published How To Resell page" });
  }
};

module.exports = getPublishedPage;
