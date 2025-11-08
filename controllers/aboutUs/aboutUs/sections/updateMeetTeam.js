

const MeetTeam = require("../../../../Models/aboutUs/sections/MeetTeam");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");

const updateMeetTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, mainHeading, mainDescription, status } = req.body;
    const files = req.files || [];

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });
    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!mainHeading || !mainDescription) return res.status(400).json({ success: false, message: "Main heading & description are required" });

  
    let parsedMembers = [];
    if (req.body.teamMembers) {
      try {
        parsedMembers = typeof req.body.teamMembers === "string" 
          ? JSON.parse(req.body.teamMembers) 
          : req.body.teamMembers;
        if (!Array.isArray(parsedMembers)) parsedMembers = [];
      } catch (parseError) {
        return res.status(400).json({ success: false, message: "Invalid team members format" });
      }
    }

    const teamMembers = parsedMembers.map((m, idx) => {
      const file = files.find(f => f.fieldname === `teamMembers[${idx}][image]`);
      
      if (!m.name || !m.role || !m.description) {
        throw new Error(`Team member ${idx + 1} requires name, role, and description`);
      }
      
      if (!file && !m.image) {
        throw new Error(`Team member ${idx + 1} requires an image`);
      }
      
      return {
        name: m.name.trim(),
        role: m.role.trim(),
        description: m.description.trim(),
        image: file ? path.join("uploads", "AboutUs", file.filename) : m.image,
      };
    });

    let meetTeamDoc = null;

    if (id && id !== 'current') {
      meetTeamDoc = await MeetTeam.findById(id);
      if (!meetTeamDoc) {
        return res.status(404).json({ success: false, message: "Meet Team document not found" });
      }
    } else {

      meetTeamDoc = await MeetTeam.findOne({ aboutUsId });
      if (!meetTeamDoc) {
        return res.status(404).json({ success: false, message: "Meet Team section not found for this About Us page" });
      }
    }

    if (status === "published") {
      await MeetTeam.updateMany(
        { _id: { $ne: meetTeamDoc._id }, status: "published" }, 
        { status: "draft" }
      );
    }


    meetTeamDoc.mainHeading = mainHeading.trim();
    meetTeamDoc.mainDescription = mainDescription.trim();
    meetTeamDoc.teamMembers = teamMembers;
    
    if (status) {
      meetTeamDoc.status = status;
    }

    await meetTeamDoc.save();

    res.status(200).json({ 
      success: true, 
      data: meetTeamDoc, 
      message: "Meet the Team section updated successfully!" 
    });
  } catch (error) {
    console.error("Error updating Meet Team section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateMeetTeam;
