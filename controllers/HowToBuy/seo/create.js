const SEOMetadata = require("../../../Models/HowToBuySEO");

const createSEO = async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaAuthor } = req.body;

    if (!metaTitle) {
      return res.status(400).json({ success: false, message: "Meta title is required" });
    }

    let metaImage = "";
    if (req.file) {
      metaImage = `/uploads/seo/${req.file.filename}`;
    }

    const seo = new SEOMetadata({
      metaTitle,
      metaDescription: metaDescription || "",
      metaKeywords: metaKeywords ? metaKeywords.split(",").map(k => k.trim()) : [],
      metaAuthor: metaAuthor || "",
      metaImage,
    });

    await seo.save();

    res.status(201).json({ success: true, data: seo, message: "SEO metadata created successfully." });
  } catch (error) {
    console.error("createSEO error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createSEO;
