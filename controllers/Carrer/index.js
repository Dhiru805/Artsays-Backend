const createCareer = require("./Career/create");
const updateCareer = require("./Career/update");
const deleteCareer = require("./Career/delete");
const { getCareer,  getCareerById} = require("./Career/get");
// const getCareer = require("./Career/get");
const updateCareerStatus = require("./Career/updateStatus");

module.exports = {
  createCareer,
  updateCareer,
  deleteCareer,
  getCareer,
  getCareerById,
  updateCareerStatus,
};
