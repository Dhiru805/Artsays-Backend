
const MeetTeam = require("../../../../Models/aboutUs/sections/MeetTeam");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");

const createMeetTeam = async (req, res) => {
  try {
    const { aboutUsId, mainHeading, mainDescription } = req.body;
    const files = req.files || [];

    if (!aboutUsId) {
      return res
        .status(400)
        .json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res
        .status(404)
        .json({ success: false, message: "Main About Us page not found" });
    }

    
    let teamMembersFromClient = req.body.teamMembers;
    let parsedMembers =
      typeof teamMembersFromClient === "string"
        ? JSON.parse(teamMembersFromClient)
        : teamMembersFromClient || [];

    if (!mainHeading || !mainDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Main heading & description are required" });
    }

    const teamMembers = parsedMembers.map((m, idx) => {
      const file = files.find((f) => f.fieldname === `teamMembers[${idx}][image]`);
      if (!m.name || !m.role || !m.description || !file) {
        throw new Error(
          `Team member ${idx + 1} requires name, role, description, and an image`
        );
      }
      return {
        name: m.name.trim(),
        role: m.role.trim(),
        description: m.description.trim(),
        image: path.join("uploads", "AboutUs", file.filename),
      };
    });

    const meetTeamSection = new MeetTeam({
      aboutUsId,
      mainHeading: mainHeading.trim(),
      mainDescription: mainDescription.trim(),
      teamMembers,
    });

    await meetTeamSection.save();

    aboutUsPage.meetTeam = meetTeamSection._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: meetTeamSection,
      message: "Meet the Team section created successfully!",
    });
  } catch (error) {
    console.error("Error creating Meet Team section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createMeetTeam;
