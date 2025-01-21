const express = require('express');
const router = express.Router();
const userRoutes = require('./user/Auth');

router.use('/v1', userRoutes);
module.exports = router;