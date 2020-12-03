const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobTagsSchema = new Schema({
    tagName: String,
    rank: Number,
    jobId: Schema.ObjectId,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('JobTags', JobTagsSchema);
