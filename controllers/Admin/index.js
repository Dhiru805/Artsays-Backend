const getadmin = require("./Admin/getadmin");
const updatecompanyinfo=require("./Admin/updatecompanyinfo");
const getcomapnyinfo=require("./Admin/getcomapnyinfo")
const getproduct=require("./Product/getproduct")
const createChallenge=require("./Super-adminChallange/create")
const getchallengedata=require("./Super-adminChallange/getchallengedata")
const updateChallenges=require("./Super-adminChallange/updateChallenge")
const getChallengeById = require("./Super-adminChallange/getchallengebyid");
const deleteChallenge = require("./Super-adminChallange/deletechallenge");
const getLatestChallenge = require("./Super-adminChallange/getlatestchallenge");


module.exports = {
   getadmin,
   updatecompanyinfo,
   getcomapnyinfo,
   getproduct,
   createChallenge,
   getchallengedata,
   getLatestChallenge,
   updateChallenges,
   getChallengeById,
   deleteChallenge,
};