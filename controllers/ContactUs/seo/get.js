const SEOMetadata = require("../../../Models/contactusSEO");

const getSEO = async (req, res) => {
  try {
    const seo = await SEOMetadata.findOne().sort({ createdAt: -1 });
    if (!seo) return res.status(404).json({ success: false, message: "No SEO metadata found." });

    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    console.error("getSEO error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getSEO;
