const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    companyName: {
        required: true,
        type: String,
    },
    location: {
        type: String,
        required: true ,
    },
    salary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    locationType: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    refUseId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Job", jobSchema);