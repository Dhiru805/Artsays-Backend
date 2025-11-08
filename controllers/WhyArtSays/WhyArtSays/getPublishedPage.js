const WhyArtsays = require("../../../Models/WhyArtSays");

const getPublishedPage = async (req, res) => {
  try {
    const page = await WhyArtsays.findOne({ status: "published" }).sort({
      createdAt: -1,
    });

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "No published page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching published page" });
  }
};

module.exports = getPublishedPage;
