const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first: String,
    last: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    type: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);
