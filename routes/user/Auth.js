const express = require('express');
const UserController = require('../../controller/user/UserController');
const router = express.Router();

router.post('/InputRecord', UserController.InputRecord);
router.get('/GetRecord', UserController.GetRecord);
router.get('/GetRecord/:id', UserController.GetRecordById);
router.patch('/UpdateRecord/:id', UserController.UpdateRecordById);
router.delete('/DeleteRecord/:id', UserController.DeleteRecord);

module.exports = router;