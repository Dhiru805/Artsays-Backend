const createPage = require("./ContactUs/create");
const updatePage = require("./ContactUs/update");
const deletePage = require("./ContactUs/delete");
const getPages = require("./ContactUs/get");
const getPublishedPage = require("./ContactUs/getPublishedPage");
const createSEO = require("./seo/create");
const updateSEO = require("./seo/update");
const getSEO = require("./seo/get");

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
