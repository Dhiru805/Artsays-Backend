const InsurancePage = require("../../../Models/Insurance");

const getInsurancePages = async (req, res) => {
  try {
    const pages = await InsurancePage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching Insurance pages:", error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getInsurancePages;
