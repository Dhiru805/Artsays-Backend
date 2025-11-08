const express = require("express")
const { applyCarrerJob, upload, getCareerJobApplications, updateCareerJobApplication } = require('../controllers/careerApplications/careerApplications')

const router = express.Router()

router.post('/apply-career-job', upload.single("resume"), applyCarrerJob)
router.get('/career-jobs-applications', getCareerJobApplications)
router.put('/update-career-application/:id', upload.single("resume"), updateCareerJobApplication)

module.exports = router;