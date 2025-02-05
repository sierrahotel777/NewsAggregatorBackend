const express = require('express');
const UserController = require('../../controller/user/UserController');
const router = express.Router();

router.post('/RegisterUser', UserController.RegisterUser);
router.post('/CheckUser', UserController.CheckUser);
router.post('/VerifyOTP', UserController.VerifyOTP);
router.patch('/UpdateProfile', UserController.UpdateProfile);
router.get('/GetProfile', UserController.GetProfileByID);

module.exports = router;