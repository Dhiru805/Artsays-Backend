
//const Policy = require("../../Models/Policy"); 
const createPolicy = require("./Policy/createPolicy");
const updatePolicy = require("./Policy/updatePolicy");
const deletePolicyById = require("./Policy/deletePolicy");
const getPoliciesByUserId = require("./Policy/getPolicyByUserId");
const getPolicyById = require("./Policy/getPolicyById"); 
const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {
  createPolicy,
  updatePolicy,
  deletePolicyById,
  getPoliciesByUserId,
  getPolicyById,
  createSEO,
  updateSEO,
  getSEO,
};
