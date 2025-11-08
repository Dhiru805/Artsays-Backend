
const AboutUs = require("../../../Models/aboutUs/AboutUs");

const updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status, 
      whoWeAre,
      whatWeDo,
      missionVision,
      ourValues,
      deliveryProcess,
      meetTeam,
      testimonials,
    } = req.body;

    const page = await AboutUs.findById(id);
    if (!page)
      return res.status(404).json({ success: false, message: "Page not found" });

    if (title) page.title = title;
    if (description) page.description = description;

    if (whoWeAre) page.whoWeAre = whoWeAre;
    if (whatWeDo) page.whatWeDo = whatWeDo;
    if (missionVision) page.missionVision = missionVision;
    if (ourValues) page.ourValues = ourValues;
    if (deliveryProcess) page.deliveryProcess = deliveryProcess;
    if (meetTeam) page.meetTeam = meetTeam;
    if (testimonials) page.testimonials = testimonials;

    if (status === "published") {
      await AboutUs.updateMany({ status: "published" }, { $set: { status: "draft" } });
      page.status = "published";
    } else if (status) {
      page.status = status; 
    }

    await page.save();

    res.status(200).json({
      success: true,
      data: page,
      message: "About Us page updated successfully!",
    });
    console.log("AboutUs PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating About Us page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateAboutUs;
