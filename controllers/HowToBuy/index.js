const createPage = require("./HowToBuy/create");
const updatePage = require("./HowToBuy/update");
const deletePage = require("./HowToBuy/delete");
const getPages = require("./HowToBuy/getPages");
const getPageById = require("./HowToBuy/getPageById");
const getPublishedPage = require("./HowToBuy/getPublishedPage");
const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPageById,
  getPublishedPage,
  createSEO,
  updateSEO,
  getSEO,
  
};
