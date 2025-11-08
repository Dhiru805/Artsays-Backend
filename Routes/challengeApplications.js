const express = require("express")
const { upload, joinChallenge, getChallengesApplications, updateChallengeApplication } = require("../controllers/challengeApplications/challengeApplications")

const router = express.Router()

router.post("/join-challenge", upload.single("works"), joinChallenge)
router.get("/challenges-applications", getChallengesApplications)
router.put("/challenges/update-application/:id", upload.single("works"), updateChallengeApplication)

module.exports = router;