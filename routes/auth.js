const router = require('express').Router()

const authController = require('../controller/authController')
const middlewareController = require('../controller/middlewareController')

router.post("/testregister", authController.register)

router.post("/testlogin", authController.login)

router.post("/logout", middlewareController.verifyToken ,authController.logout)
//refresh token
router.post("/refresh", authController.requestRefreshToken)

module.exports = router