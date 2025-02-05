const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const router = require('./routes/index');
const mongoose = require('mongoose');
const db = require('./db/index');


const dotenv = require('dotenv');
dotenv.config();

app.use('/NA', router);


const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});