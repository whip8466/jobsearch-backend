const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: String,
    designation: String,
    location: String,
    qualifications: String,
    yearOfExp: String,
    description: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('jobs', JobSchema);
