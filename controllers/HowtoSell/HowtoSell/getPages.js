const HowToSell = require("../../../Models/HowToSell");

const getPages = async (req, res) => {
  try {
    const pages = await HowToSell.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching How To Sell pages" });
  }
};

module.exports = getPages;
