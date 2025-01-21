const express = require('express');
const UserController = require('../../controller/user/UserController');
const router = express.Router();

router.post('/InputRecord', UserController.InputRecord);
router.get('/students', UserController.GetRecord);
router.get('/students/:id', UserController.GetRecordById);
router.patch('/students/:id', UserController.UpdateRecordById);
router.delete('/students/:id', UserController.DeleteRecord);

module.exports = router;
