const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    profile: { type: String, default: 'null' },
    email: { type: String, required: true },
    mobileno: { type: String, required: true },
    bio: { type: String },
    otp: { type: String },
}, { timestamps: true });


const User = mongoose.model('userDetails', userSchema);

module.exports = User;
