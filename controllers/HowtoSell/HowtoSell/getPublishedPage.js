const HowToSell = require("../../../Models/HowToSell");

const getPublishedPage = async (req, res) => {
  try {
  
    const page = await HowToSell.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({ success: false, message: "No published How To Sell page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching published How To Sell page" });
  }
};

module.exports = getPublishedPage;