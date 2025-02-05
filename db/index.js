const { default: mongoose } = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

mongoose.createConnection(DB_URL);
