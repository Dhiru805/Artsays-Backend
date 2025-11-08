const createPage = require("./Licensing/create");
const updatePage = require("./Licensing/update");
const deletePage = require("./Licensing/delete");
const getPages = require("./Licensing/getPages");
const getPublishedPage = require("./Licensing/getPublishedPage");
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
