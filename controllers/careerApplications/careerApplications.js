const CareerApplications = require("../../Models/careerApplications")
const multer = require("multer")
const path = require("path")
const Career = require("../../Models/Career")

// Configure resume storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/careerApplications/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

// Create new job application
const applyCarrerJob = async (req, res) => {

    try {

        const { fullName, email, contactNumber, jobPosition, coverLetter, condition, jobId } = req.body;

        if (!req.file) {
            return res.status(400).json({
                hasError: true,
                message: "Resume is required"
            })
        }

        // Validate job exists
        const isJobExists = await Career.findById(jobId)
        if (!isJobExists) {
            return res.status(404).json({
                hasError: true,
                message: "Job not found"
            })
        }

        const newApplication = new CareerApplications({
            fullName,
            email,
            contactNumber,
            jobPosition,
            coverLetter,
            resume: req.file.filename,
            condition,
            jobId,
            date: new Date()
        });
        await newApplication.save()

        return res.status(201).json({
            hasError: false,
            message: "Application submitted successfully"
        })
    }
    catch (error) {
        console.error("Error applying for job: ", error)
        return res.status(500).json({
            hasError: true,
            message: "Failed to submit application",
            error: error.message
        })
    }
};

// Get careers job applications
const getCareerJobApplications = async (req, res) => {
    try {
        const applications = await CareerApplications.find()

        if (applications.length < 1) {
            return res.json({ message: "No job applications" })
        }
        return res.status(200).json({
            hasError: false,
            message: "Successful",
            data: applications
        })
    }
    catch (error) {
        console.log("Error while fetching job applications", error)
        return res.status(500).json({
            hasError: true,
            message: "Failed to fetch applications",
            error: error.message
        })
    }
};

// Update career job application
const updateCareerJobApplication = async (req, res) => {
    try {

        const { id } = req.params;
        const { fullName, email, contactNumber, jobPosition, coverLetter, condition } = req.body;

        const application = await CareerApplications.findById(id)
        if (!application) {
            return res.status(404).json({
                hasError: true,
                message: "Application not found"
            })
        }

        // Update fields if provided
        if (fullName) application.fullName = fullName
        if (email) application.email = email
        if (contactNumber) application.contactNumber = contactNumber
        if (jobPosition) application.jobPosition = jobPosition
        if (coverLetter) application.coverLetter = coverLetter
        if (condition !== undefined) application.condition = condition

        // If new resume uploaded
        if (req.file) {
            application.resume = req.file.filename
        }

        await application.save()

        return res.status(200).json({
            hasError: false,
            message: "Application update successfully",
            data: application
        })
    }
    catch (error) {
        console.error("Error updating job application: ", error)
        return res.status(500).json({
            hasError: true,
            message: "Failed to update application",
            error: error.message
        })
    }
};

module.exports = { applyCarrerJob, upload, getCareerJobApplications, updateCareerJobApplication };