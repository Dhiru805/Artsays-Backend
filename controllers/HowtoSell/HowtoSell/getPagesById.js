const HowToSell = require("../../../Models/HowToSell");

const getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await HowToSell.findById(id);

    if (!page) {
      return res.status(404).json({ success: false, message: "How To Sell page not found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching How To Sell page" });
  }
};

module.exports = getPageById;

