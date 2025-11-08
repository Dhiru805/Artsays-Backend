const ChallengeApplications = require("../../Models/ChallengeApplications")
const multer = require("multer")
const path = require("path")

// Configure uploaded work storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/challengeApplications/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

// Create new challenge application
const joinChallenge = async (req, res) => {
    try {
        const { fullName, email, contactNumber, userName, challengeName, category, description, guidelines } = req.body;

        if (!req.file) {
            return res.status(400).json({
                hasError: true,
                message: "Yours work is required"
            })
        }

        // Build full URL for works file
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/challengeApplications/${req.file.filename}`

        const newApplication = new ChallengeApplications({
            fullName,
            email,
            contactNumber,
            artistUsername: userName,
            challenge: challengeName,
            category,
            description,
            work: fileUrl,
            guidelines,
            joinedDate: new Date()
        })
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

// Get challenges applications
const getChallengesApplications = async (req, res) => {
    try {
        const applications = await ChallengeApplications.find()

        if (applications.length < 1) {
            return res.json({ message: "No Challenge Applications" })
        }
        return res.status(200).json({
            hasError: false,
            message: "Successful",
            data: applications
        })
    }
    catch (error) {
        console.log("Error while fetching applications", error)
        return res.status(500).json({
            hasError: true,
            message: "Failed to fetch applications",
            error: error.message
        })
    }
};

// Update challenge application
const updateChallengeApplication = async (req, res) => {

    const { id } = req.params;
    const { fullName, email, contactNumber, userName, challengeName, category, description, guidelines } = req.body;

    try {

        const application = await ChallengeApplications.findById(id)
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
        if (userName) application.artistUsername = userName
        if (challengeName) application.challenge = challengeName
        if (category) application.category = category
        if (description) application.description = description
        if (guidelines !== undefined) application.guidelines = guidelines

        // If new resume uploaded
        if (req.file) {
            application.work = req.file.filename
        }

        await application.save()

        return res.status(200).json({
            hasError: false,
            message: "Application update successfully",
            data: application
        })
    }
    catch (error) {
        console.error("Error updating application: ", error)
        return res.status(500).json({
            hasError: true,
            message: "Failed to update application",
            error: error.message
        })
    }
};

module.exports = { upload, joinChallenge, getChallengesApplications, updateChallengeApplication }