const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    grade: { type: String },
    isGraduated: { type: Boolean },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
