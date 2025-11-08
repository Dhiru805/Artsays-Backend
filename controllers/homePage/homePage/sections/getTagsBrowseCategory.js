const BrowseCategories = require("../../../../Models/homePage/sections/browseCategories"); 

const getBrowseTags = async (req, res) => {
  try {
    const { homepageId } = req.params;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const browse = await BrowseCategories.findOne({ homepageId }).sort({ createdAt: -1 });

    if (!browse) {
      return res.status(404).json({ success: false, message: "No BrowseCategories found for this homepage" });
    }

    res.status(200).json({ success: true, data: browse.tags });
  } catch (error) {
    console.error("Error fetching browse tags:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getBrowseTags;
