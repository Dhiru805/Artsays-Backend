const HowToResell = require("../../../Models/HowToResell");

const getPages = async (req, res) => {
  try {
    const pages = await HowToResell.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching How To Resell pages" });
  }
};

module.exports = getPages;
