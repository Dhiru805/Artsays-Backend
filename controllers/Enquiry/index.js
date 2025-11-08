const getAllEnquiries = require("./Enquiry/get");
const getEnquiryById = require("./Enquiry/getEnquiryById");
const deleteEnquiry = require("./Enquiry/delete");
const createEnquiry = require("./Enquiry/create");

module.exports = {
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
  createEnquiry,
};
