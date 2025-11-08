const express = require("express");
const router = express.Router();

const uploadChallengeImage = require("../Middlewares/Multerfile/multerChallengeUpload");

const {
 createChallenge,
 getchallengedata,
 updateChallenges,
 getChallengeById,
 getLatestChallenge,
 deleteChallenge,
} = require("../controllers/Admin/index");


router.post("/create/:userId", uploadChallengeImage, createChallenge);
router.get("/getchallengedata", getchallengedata);
router.get("/getlatestchallenge" , getLatestChallenge);
router.get("/getchallengebyid/:id", getChallengeById);
router.put("/update/:challengeId", uploadChallengeImage, updateChallenges);
router.delete('/deleteChallenge/:id', deleteChallenge);

module.exports = router;
