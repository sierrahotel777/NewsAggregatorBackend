const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
    title: { type: String },
    source: { type: String },
    category: { type: String },
    time: { type: String },
    image: { type: String },
}, { timestamps: true });

const recentNews = mongoose.model('recentNews', newsSchema);



module.exports = recentNews;