const Celebrities = require("../../Models/Celebraties");
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/celebrities/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage })

const createCelebrities = async (req, res) => {

    const { artistName, profession, highlightsOfJourney, artWorkCollected, yearsInArt, exhibitionFeatured, artistId } = req.body;

    try {

        // Validate required fields
        if (!artistName || !profession || !highlightsOfJourney || !artWorkCollected || !yearsInArt || !exhibitionFeatured) {
            return res.status(400).json({
                hasError: true,
                message: "Please fill the fields"
            })
        }

        // Check if already exists
        const existingCelebrity = await Celebrities.findOne({ artistName })
        if (existingCelebrity) {
            return res.status(400).json({
                hasError: true,
                message: "This artist already exists"
            })
        }

        const fileURL = `${req.protocol}://${req.get("host")}/uploads/celebrities/${req.file.filename}`;

        // Create new entry
        const newCelebrity = new Celebrities({
            artistId,
            artistName,
            profession,
            highlightsOfJourney,
            artWorkCollected,
            yearsActiveInArt: yearsInArt,
            exhibitionFeatured,
            profilePicture: fileURL
        });

        await newCelebrity.save()

        return res.status(201).json({
            hasError: false,
            message: "Created successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            hasError: true,
            message: "Internal server error",
            error: error.message
        })
    }
};

const getCelebrities = async (req, res) => {
    try {

        const celebrities = await Celebrities.find()

        return res.status(200).json({
            hasError: false,
            message: "Successfully fetched",
            data: celebrities
        })
    }
    catch (error) {
        return res.status(500).json({
            hasError: true,
            message: "Internal server error",
            error: error.message
        })
    }
};

const updateCelebrity = async (req, res) => {

    const { id } = req.params
    const { celebrityName, profession, journey, artWorksCollected, yearsActiveInArt, exhibitionFeatured, celebrityId } = req.body;

    try {

        const celebrityData = await Celebrities.findById(id)
        if (!celebrityData) {
            return res.status(404).json({
                hasError: true,
                message: "Celebrity not found"
            })
        }

        if (celebrityId) celebrityData.artistId = celebrityId
        if (celebrityName) celebrityData.artistName = celebrityName
        if (profession) celebrityData.profession = profession
        if (journey) celebrityData.highlightsOfJourney = journey
        if (artWorksCollected) celebrityData.artWorkCollected = artWorksCollected
        if (yearsActiveInArt) celebrityData.yearsActiveInArt = yearsActiveInArt
        if (exhibitionFeatured) celebrityData.exhibitionFeatured = exhibitionFeatured

        if (req.file) {
            const fileURL = `${req.protocol}://${req.get("host")}/uploads/celebrities/${req.file.filename}`;
            celebrityData.profilePicture = fileURL
        }

        await celebrityData.save()

        return res.status(200).json({
            hasError: false,
            message: "Updated successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            hasError: true,
            message: "Internal server error",
            error: error.message
        })
    }
};

const removeCelebrity = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedCelebrity = await Celebrities.findByIdAndDelete(id)

        if (!deletedCelebrity) {
            return res.status(404).json({
                hasError: true,
                message: "Celebrity not found"
            })
        }

        return res.status(200).json({
            hasError: false,
            message: "Celebrity removed successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            hasError: true,
            message: "Internal server error",
            error: error.message
        })
    }
};

module.exports = { createCelebrities, getCelebrities, upload, updateCelebrity, removeCelebrity }