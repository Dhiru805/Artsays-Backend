
const createAboutUs = require("./aboutUs/createAboutUs");
const updateAboutUs = require("./aboutUs/updateAboutUs");
const deleteAboutUs = require("./aboutUs/deleteAboutUs");
const getPages = require("./aboutUs/getPages");
const getPublishedPage = require("./aboutUs/getPublishedPage");

const createWhoWeAre = require("./aboutUs/sections/createWhoWeAre");
const updateWhoWeAre = require("./aboutUs/sections/updateWhoWeAre");
const getWhoWeAre = require("./aboutUs/sections/getWhoWeAre");

const createWhatWeDo = require("./aboutUs/sections/createWhatWeDo");
const updateWhatWeDo = require("./aboutUs/sections/updateWhatWeDo");
const getWhatWeDo = require("./aboutUs/sections/getWhatWeDo");

const createMissionVision = require("./aboutUs/sections/createMissionVision");
const updateMissionVision = require("./aboutUs/sections/updateMissionVision");
const getMissionVision = require("./aboutUs/sections/getMissionVision");

const createOurValues = require("./aboutUs/sections/createOurValues");
const updateOurValues = require("./aboutUs/sections/updateOurValues");
const getOurValues = require("./aboutUs/sections/getOurValues");

const createDeliveryProcess = require("./aboutUs/sections/createDeliveryProcess");
const updateDeliveryProcess = require("./aboutUs/sections/updateDeliveryProcess");
const getDeliveryProcess = require("./aboutUs/sections/getDeliveryProcess");

const createMeetTeam = require("./aboutUs/sections/createMeetTeam");
const updateMeetTeam = require("./aboutUs/sections/updateMeetTeam");
const getMeetTeam = require("./aboutUs/sections/getMeetTeam");

const createTestimonials = require("./aboutUs/sections/createTestimonials");
const updateTestimonials = require("./aboutUs/sections/updateTestimonials");
const getTestimonials = require("./aboutUs/sections/getTestimonials");


const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  updateSEO,
  getSEO,
  createSEO,

  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getPages,
  getPublishedPage,

  createWhoWeAre,
  createWhatWeDo,
  createMissionVision,
  createOurValues,
  createDeliveryProcess,
  createMeetTeam,
  createTestimonials,

  updateWhoWeAre,
  updateWhatWeDo,
  updateMissionVision,
  updateOurValues,
  updateDeliveryProcess,
  updateMeetTeam,
  updateTestimonials,

  getWhoWeAre,
  getWhatWeDo,
  getMissionVision,
  getOurValues,
  getDeliveryProcess,
  getMeetTeam,
  getTestimonials,
};
