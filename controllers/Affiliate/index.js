const createPage = require("./Affiliate/create");
const updatePage = require("./Affiliate/update");
const deletePage = require("./Affiliate/delete");
const getPages = require("./Affiliate/getPages");
const getPublishedPage = require("./Affiliate/getPublishedPage");
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
