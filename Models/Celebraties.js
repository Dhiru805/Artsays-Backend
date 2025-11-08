const mongoose = require("mongoose")

const celebritiesSchema = mongoose.Schema({
    artistId: { type: String, required: true },
    artistName: { type: String, required: true },
    profession: { type: String, required: true },
    highlightsOfJourney: { type: String, required: true },
    artWorkCollected: { type: String, required: true },
    yearsActiveInArt: { type: String, required: true },
    exhibitionFeatured: { type: String, required: true },
    profilePicture: { type: String, required: true }
});

const Celebrities = mongoose.model("Celebrities", celebritiesSchema)

module.exports = Celebrities;