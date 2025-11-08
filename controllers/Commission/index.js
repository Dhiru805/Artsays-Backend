const createPage = require("./Commission/create");
const updatePage = require("./Commission/update");
const deletePage = require("./Commission/delete");
const getPages = require("./Commission/getPages");
const getPublishedPage = require("./Commission/getPublishedPage");
const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPublishedPage,
  updateSEO,
  getSEO,
  createSEO,
};
