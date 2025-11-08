const createPage = require("./HowToBid/create");
const updatePage = require("./HowToBid/update");
const deletePage = require("./HowToBid/delete");
const getPages = require("./HowToBid/getPages");
const getPublishedPage = require("./HowToBid/getPublishedPage");
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
