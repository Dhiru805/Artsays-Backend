const createPage = require("./CMSArtsaysGallery/create");
const updatePage = require("./CMSArtsaysGallery/update");
const deletePage = require("./CMSArtsaysGallery/delete");
const getPages = require("./CMSArtsaysGallery/get");
const getPagesById = require("./CMSArtsaysGallery/getById");
const getPublishedPage = require("./CMSArtsaysGallery/getPublishedPage");
const CMSArtsaysGallery = require("./CMSArtsaysGallery/CMSArtGalleryProfilepic");


module.exports = {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPagesById,
  getPublishedPage,
  CMSArtsaysGallery,
}