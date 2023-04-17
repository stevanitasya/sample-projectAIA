const express = require('express');
const controller = require('../controller/userController');
const router = express.Router();

router.post('/login', controller.login);
router.post('/checkOTP', controller.checkOTP);
router.patch('/setname', controller.changeName);
router.patch('/setemail', controller.changeEmail);
router.patch('/setpassword', controller.changePassword);


module.exports = router;
