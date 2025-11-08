const AboutUs = require("../../../Models/aboutUs/AboutUs");

const createAboutUs = async (req, res) => {
  try {
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

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

   
    if (status === "published") {
      await AboutUs.updateMany({ status: "published" }, { $set: { status: "draft" } });
    }

    const page = new AboutUs({
      title,
      description: description || "",
      status: status || "draft",
      whoWeAre,
      whatWeDo,
      missionVision,
      ourValues,
      deliveryProcess,
      meetTeam,
      testimonials,
    });

    await page.save();

    res.status(201).json({ success: true, data: page, message: "About Us page created successfully!" });
    console.log("AboutUs PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating About Us page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createAboutUs;


