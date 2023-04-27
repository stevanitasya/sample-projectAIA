const express = require('express');
const controller = require('../controller/userController');
const router = express.Router();

router.post('/login', controller.login);
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: Login user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: logged in
 */
router.post('/checkOTP', controller.checkOTP);
router.get('/userprofile', controller.getProfile);
router.patch('/updateprofile',  controller.updateProfile);


module.exports = router;
