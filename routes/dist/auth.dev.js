"use strict";

var router = require('express').Router();

var authController = require('../controller/authController');

var middlewareController = require('../controller/middlewareController');

router.post("/testregister", authController.register);
router.post("/testlogin", authController.login);
router.post("/logout", middlewareController.verifyToken, authController.logout); //refresh token

router.post("/refresh", authController.requestRefreshToken);
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
