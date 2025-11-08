const HowToBuy = require("../../../Models/HowToBuy");

const getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await HowToBuy.findById(id);

    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching page" });
  }
};

module.exports = getPageById;

