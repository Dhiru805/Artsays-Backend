
const WhatWeDo = require("../../../../Models/aboutUs/sections/WhatWeDo");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const getWhatWeDo = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {

      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("whatWeDo");
      if (aboutUsPage && aboutUsPage.whatWeDo) {
        section = aboutUsPage.whatWeDo;
      }
    } else {

      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("whatWeDo");

      if (latestAboutUs?.whatWeDo) {
        section = latestAboutUs.whatWeDo;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "What We Do section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching What We Do section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = getWhatWeDo;