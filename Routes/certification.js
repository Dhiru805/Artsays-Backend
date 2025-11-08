
const express = require("express");
const {
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
} = require("../controllers/Certifiaction/index");
const router = express.Router();


router.post("/create-certification-setting", createCertificationssetting);
router.put("/update-certification-setting/:id", updateCertificationssetting);
router.delete("/delete-certification-setting/:id",deleteCertificationssetting);
router.get("/get-certification-setting", getCertificationssetting);

//============================================certifications ===========================================//

router.get("/users-by-type",getuserbytype);
router.get("/products-by-user", getuserproduct);
router.post("/create-certification",  createcertifications);
router.delete("/delete-certification/:id",deleteCertification);
router.get("/get-certification",getcertification);
router.get("/get-certificationbyId/:userId",getcertificationbyuserid);


module.exports = router;