const SEOMetadata = require("../../../Models/HowToBuySEO");
const fs = require("fs");
const path = require("path");

const updateSEO = async (req, res) => {
  try {
    const { id } = req.params;
    const { metaTitle, metaDescription, metaKeywords, metaAuthor } = req.body;

    if (!metaTitle) {
      return res.status(400).json({ success: false, message: "Meta title is required" });
    }

    const seo = await SEOMetadata.findById(id);
    if (!seo) return res.status(404).json({ success: false, message: "SEO metadata not found." });

    if (req.file) {
      if (seo.metaImage) {
        const oldPath = path.join(__dirname, "../../", seo.metaImage);
        fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
      }
      seo.metaImage = `/uploads/seo/${req.file.filename}`;
    }

    seo.metaTitle = metaTitle;
    seo.metaDescription = metaDescription || "";
    seo.metaKeywords = metaKeywords ? metaKeywords.split(",").map(k => k.trim()) : [];
    seo.metaAuthor = metaAuthor || "";

    await seo.save();

    res.status(200).json({ success: true, data: seo, message: "SEO metadata updated successfully." });
  } catch (error) {
    console.error("updateSEO error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateSEO;
