const createCertificationssetting= require("./CertificationSettings/createcertifiactionsetting");
const updateCertificationssetting= require("./CertificationSettings/updateCertificationSetting");
const deleteCertificationssetting= require("./CertificationSettings/deleteCertificationSetting");
const getCertificationssetting= require("./CertificationSettings/getCertificationsetting");

const getuserbytype=require("./Certification/getuserbytype");
const getuserproduct=require("./Certification/GetProductsByUser");
const createcertifications=require("./Certification/CreateCertification");
const getcertification=require("./Certification/getcertification");
const deleteCertification=require("./Certification/deletecertification");
const getcertificationbyuserid=require("./Certification/getcertificationsbyuserId");




module.exports = {
 createCertificationssetting,
 updateCertificationssetting,
 deleteCertificationssetting,
 getCertificationssetting,
 getuserbytype,
 getuserproduct,
 createcertifications,
 getcertification,
 deleteCertification,
 getcertificationbyuserid
};