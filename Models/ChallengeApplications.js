const mongoose = require("mongoose")

const challengeApplicationSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    artistUsername: { type: String, required: true },
    challenge: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    work: { type: String, required: true },
    guidelines: { type: Boolean, required: true },
    joinedDate: { type: Date }
})

const ChallengeApplications = mongoose.model("ChallengeApplications", challengeApplicationSchema)

module.exports = ChallengeApplications;