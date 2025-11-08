const InsurancePage = require("../../../Models/Insurance");

const getPublishedInsurancePage = async (req, res) => {
  try {
    const page = await InsurancePage.findOne({ status: "published" }).sort({
      createdAt: -1,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "No published insurance page found",
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Insurance published page:", error);
    res.status(500).json({ success: false, message: "Error fetching page" });
  }
};

module.exports = getPublishedInsurancePage;
