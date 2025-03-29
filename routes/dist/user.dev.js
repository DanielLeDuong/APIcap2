"use strict";

var middlewareController = require('../controller/middlewareController');

var userController = require('../controller/userController');

var router = require('express').Router(); //get all user


router.get('/', userController.getAllUser); //delete

router["delete"]('/:id', middlewareController.deleteAuth, userController.deleteUser);
module.exports = router;
//# sourceMappingURL=user.dev.js.map
