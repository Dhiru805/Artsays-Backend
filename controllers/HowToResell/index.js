const createPage = require("./HowToResell/create");
const updatePage = require("./HowToResell/update");
const deletePage = require("./HowToResell/delete");
const getPages = require("./HowToResell/getPages");
const getPublishedPage = require("./HowToResell/getPublishedPage");
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
