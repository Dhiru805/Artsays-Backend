const createInsuranceSetting = require("./Insurance/create");
const updateInsuranceSetting = require("./Insurance/update");
const getInsuranceSetting = require("./Insurance/get");
const deleteInsuranceSetting = require("./Insurance/delete");
const getInsurancePages = require("./Insurance/getPages");
const getPublishedInsurancePage = require("./Insurance/getpublishedPage");

module.exports = {
  createInsuranceSetting,
  updateInsuranceSetting,
  getInsuranceSetting,
  deleteInsuranceSetting,
  getInsurancePages,
  getPublishedInsurancePage,
};
