const express = require('express');
const controller = require('../controller/emailtemplateController');
const router = express.Router();

router.get('/', controller.getlistEmail);
router.get('/:id', controller.getEmail);
router.post('/createtemplate', controller.createEmail);
router.patch('/edit/:id', controller.editEmailTemplate);
router.post('/send/:id', controller.sendEmail);

module.exports = router;