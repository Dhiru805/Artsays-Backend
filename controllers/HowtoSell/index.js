const createPage = require("./HowtoSell/create");
const updatePage = require("./HowtoSell/update");
const deletePage = require("./HowtoSell/delete");
const getPages = require("./HowtoSell/getPages");
const getPageById = require("./HowtoSell/getPagesById");
const getPublishedPage = require("./HowtoSell/getPublishedPage");
const createSEO = require("./seo/create");
const updateSEO = require("./seo/update");
const getSEO = require("./seo/get");

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
