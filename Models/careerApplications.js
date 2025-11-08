const mongoose = require('mongoose')

const careerApplicationsSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    jobPosition: { type: String, required: true },
    coverLetter: { type: String, required: true },
    resume: { type: String, required: true },
    condition: { type: Boolean, default: false, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
    date: { type: Date }
});

const CareerApplications = mongoose.model("CareerApplications", careerApplicationsSchema);

module.exports = CareerApplications;
