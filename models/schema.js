const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    profile: { type: String, default: 'https://instagram.fmaa3-3.fna.fbcdn.net/v/t51.2885-19/464827654_542346388545222_7521374733262505349_n.jpg?_nc_ht=instagram.fmaa3-3.fna.fbcdn.net&_nc_cat=106&_nc_ohc=fcD6WStLWIkQ7kNvgFO9f83&_nc_gid=762b0fecc4f048e5b3f58afc5f063b77&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYAfBRPgd-YebE5SQy2kp9t28NyJiEp5RSj_8GKJM5h_AQ&oe=67AA5F34&_nc_sid=7a9f4b' },
    email: { type: String, required: true },
    mobileno: { type: String, required: true },
    bio: { type: String, default: 'Edit Your Bio Using Edit Profile' },
    otp: { type: String },
}, { timestamps: true });


const User = mongoose.model('userDetails', userSchema);

module.exports = User;
