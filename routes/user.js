const middlewareController = require('../controller/middlewareController')
const userController = require('../controller/userController')

const router = require('express').Router()

//get all user
router.get('/' ,userController.getAllUser)

//delete
router.delete('/:id',middlewareController.deleteAuth, userController.deleteUser)

module.exports = router