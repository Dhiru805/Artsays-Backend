
const AboutUs = require("../../../Models/aboutUs/AboutUs");
const WhoWeAre = require("../../../Models/aboutUs/sections/WhoWeAre");
const WhatWeDo = require("../../../Models/aboutUs/sections/WhatWeDo");
const MissionVision = require("../../../Models/aboutUs/sections/MissionVision");
const OurValues = require("../../../Models/aboutUs/sections/OurValues");
const DeliveryProcess = require("../../../Models/aboutUs/sections/DeliveryProcess");
const MeetTeam = require("../../../Models/aboutUs/sections/MeetTeam");
const Testimonials = require("../../../Models/aboutUs/sections/Testimonials");

const deleteAboutUs = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await AboutUs.findById(id);
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    const sections = [
      { model: WhoWeAre, id: page.whoWeAre },
      { model: WhatWeDo, id: page.whatWeDo },
      { model: MissionVision, id: page.missionVision },
      { model: OurValues, id: page.ourValues },
      { model: DeliveryProcess, id: page.deliveryProcess },
      { model: MeetTeam, id: page.meetTeam },
      { model: Testimonials, id: page.testimonials },
    ];

    for (const sec of sections) {
      if (sec.id) await sec.model.findByIdAndDelete(sec.id);
    }

    await AboutUs.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "About Us page and sections deleted successfully" });
    console.log("AboutUs PAGE DELETED:", id);
  } catch (error) {
    console.error("Error deleting About Us page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteAboutUs;
