const AboutUs = require("../aboutUs/AboutUs");
const WhoWeAre = require("../aboutUs/sections/WhoWeAre");
const WhatWeDo = require("../aboutUs/sections/WhatWeDo");
const MissionVision = require("../aboutUs/sections/MissionVision");
const OurValues = require("../aboutUs/sections/OurValues");
const DeliveryProcess = require("../aboutUs/sections/DeliveryProcess");
const MeetTeam = require("../aboutUs/sections/MeetTeam");
const Testimonials = require("../aboutUs/sections/Testimonials");

// async function initAboutUs() {
//   let aboutUs = await AboutUs.findOne();
  
//   if (!aboutUs) {
//     aboutUs = await AboutUs.create({
//       title: "About Us",
//       description: "We are a company driven by innovation and excellence.",
//       status: "draft",
//     });
//     console.log("Created main AboutUs document");
//   }

//   const aboutUsId = aboutUs._id;

//   await WhoWeAre.ensureDefault(aboutUsId);
//   await WhatWeDo.ensureDefault(aboutUsId);
//   await MissionVision.ensureDefault(aboutUsId);
//   await OurValues.ensureDefault(aboutUsId);
//   await DeliveryProcess.ensureDefault(aboutUsId);
//   await MeetTeam.ensureDefault(aboutUsId);
//   await Testimonials.ensureDefault(aboutUsId);

//   console.log("All AboutUs sections initialized with defaults");
// }

// module.exports = initAboutUs;


async function initAboutUs() {
  let aboutUs = await AboutUs.findOne().sort({ createdAt: -1 });
  
  if (!aboutUs) {
    aboutUs = await AboutUs.create({
      title: "About Us",
      description: "We are a company driven by innovation and excellence.",
      status: "draft",
    });
    console.log("Created main AboutUs document");
  }

  const aboutUsId = aboutUs._id;

  let whoWeAreDoc = await WhoWeAre.findOne({ aboutUsId });
  if (!whoWeAreDoc) {
    whoWeAreDoc = await WhoWeAre.create({ aboutUsId });
    console.log("Default Who We Are document created");
  }

  let whatWeDoDoc = await WhatWeDo.findOne({ aboutUsId });
  if (!whatWeDoDoc) whatWeDoDoc = await WhatWeDo.create({ aboutUsId });

  let missionVisionDoc = await MissionVision.findOne({ aboutUsId });
  if (!missionVisionDoc) missionVisionDoc = await MissionVision.create({ aboutUsId });

  let ourValuesDoc = await OurValues.findOne({ aboutUsId });
  if (!ourValuesDoc) ourValuesDoc = await OurValues.create({ aboutUsId });

  let deliveryProcessDoc = await DeliveryProcess.findOne({ aboutUsId });
  if (!deliveryProcessDoc) deliveryProcessDoc = await DeliveryProcess.create({ aboutUsId });

  let meetTeamDoc = await MeetTeam.findOne({ aboutUsId });
  if (!meetTeamDoc) meetTeamDoc = await MeetTeam.create({ aboutUsId });

  let testimonialsDoc = await Testimonials.findOne({ aboutUsId });
  if (!testimonialsDoc) testimonialsDoc = await Testimonials.create({ aboutUsId });

  const needsUpdate = !aboutUs.whoWeAre || !aboutUs.whatWeDo || !aboutUs.missionVision || !aboutUs.ourValues || !aboutUs.deliveryProcess || !aboutUs.meetTeam || !aboutUs.testimonials;

  if (needsUpdate) {
    aboutUs = await AboutUs.findByIdAndUpdate(
      aboutUsId,
      {
        whoWeAre: whoWeAreDoc._id,
        whatWeDo: whatWeDoDoc._id,
        missionVision: missionVisionDoc._id,
        ourValues: ourValuesDoc._id,
        deliveryProcess: deliveryProcessDoc._id,
        meetTeam: meetTeamDoc._id,
        testimonials: testimonialsDoc._id,
      },
      { new: true }
    );

    console.log("All AboutUs sections initialized and linked to main document");
  } else {
    console.log("AboutUs sections already linked, skipping update");
  }
}

module.exports = initAboutUs;
