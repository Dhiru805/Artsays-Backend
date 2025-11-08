const createPage = require("./WhyArtSays/create");
const updatePage = require("./WhyArtSays/update");
const deletePage = require("./WhyArtSays/delete");
const getPages = require("./WhyArtSays/getPages");
const getPublishedPage = require("./WhyArtSays/getPublishedPage");
const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPublishedPage,
  createSEO,
  updateSEO,
  getSEO
  
};
