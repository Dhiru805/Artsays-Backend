const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/aboutUsMulter"); 


const {
  createWhoWeAre,
  updateWhoWeAre,
  getWhoWeAre,
  createWhatWeDo,
  updateWhatWeDo,
  getWhatWeDo,
  createMissionVision,
  updateMissionVision,
  getMissionVision,
  createOurValues,
  updateOurValues,
  getOurValues,
  createDeliveryProcess,
  updateDeliveryProcess,
  getDeliveryProcess,
  createMeetTeam,
  updateMeetTeam,
  getMeetTeam,
  createTestimonials,
  updateTestimonials,
  getTestimonials,
} = require("../controllers/aboutUs");


router.post("/who-we-are/create", upload, createWhoWeAre);
router.put("/who-we-are/update/:id", upload, updateWhoWeAre);
router.post("/who-we-are/update/:id", upload, updateWhoWeAre); 
router.get("/who-we-are/:aboutUsId", getWhoWeAre);


router.post("/what-we-do/create", upload, createWhatWeDo);
router.put("/what-we-do/update/:id", upload, updateWhatWeDo);
router.post("/what-we-do/update/:id", upload, updateWhatWeDo); 
router.get("/what-we-do/:aboutUsId", getWhatWeDo);


router.post("/mission-vision/create", upload, createMissionVision);
router.put("/mission-vision/update/:id", upload, updateMissionVision);
router.post("/mission-vision/update/:id", upload, updateMissionVision); 
router.get("/mission-vision/:aboutUsId", getMissionVision);


router.post("/our-values/create", upload, createOurValues);
router.put("/our-values/update/:id", upload, updateOurValues);
router.post("/our-values/update/:id", upload, updateOurValues); 
router.get("/our-values/:aboutUsId", getOurValues);


router.post("/delivery-process/create", upload, createDeliveryProcess);
router.put("/delivery-process/update/:id", upload, updateDeliveryProcess);
router.post("/delivery-process/update/:id", upload, updateDeliveryProcess);
router.get("/delivery-process/:aboutUsId", getDeliveryProcess);


router.post("/meet-team/create", upload, createMeetTeam);
router.put("/meet-team/update/:id", upload, updateMeetTeam);
router.post("/meet-team/update/:id", upload, updateMeetTeam); 
router.get("/meet-team/:aboutUsId", getMeetTeam);


router.post("/testimonials/create", upload, createTestimonials);
router.put("/testimonials/update/:id", upload, updateTestimonials);
router.post("/testimonials/update/:id", upload, updateTestimonials); 
router.get("/testimonials/:aboutUsId", getTestimonials);

module.exports = router;









