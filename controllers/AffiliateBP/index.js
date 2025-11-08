const createPageBP = require("./AffiliateBP/create");
const updatePageBP = require("./AffiliateBP/update");
const deletePageBP = require("./AffiliateBP/delete");
const getPagesBP = require("./AffiliateBP/getPages");
const getPublishedPageBP = require("./AffiliateBP/getPublishedPage");
const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  createPageBP,
  updatePageBP,
  deletePageBP,
  getPagesBP,
  getPublishedPageBP,
  updateSEO,
  getSEO,
  createSEO,
};
