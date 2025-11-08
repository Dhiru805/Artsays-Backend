

const DeliveryProcess = require("../../../../Models/aboutUs/sections/DeliveryProcess");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const getDeliveryProcess = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {
      
      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("deliveryProcess");
      if (aboutUsPage && aboutUsPage.deliveryProcess) {
        section = aboutUsPage.deliveryProcess;
      }
    } else {
     
      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("deliveryProcess");

      if (latestAboutUs?.deliveryProcess) {
        section = latestAboutUs.deliveryProcess;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Delivery Process section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Delivery Process section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getDeliveryProcess;
