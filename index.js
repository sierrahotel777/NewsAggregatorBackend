const express = require('express');
const router = require('./routes/index');
const mongoose = require('mongoose');
const app = express();
const db = require('./db/index');
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
app.use('/NA', router);


const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});