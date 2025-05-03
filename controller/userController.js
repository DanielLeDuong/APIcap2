const RegisterModel = require('../API/Register')

//lay user tu postman
const userController = {
    //get all user
    getAllUser: async(req,res) => {
        try {
            const user = await RegisterModel.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete user
    deleteUser: async(req,res) => {
        try {
            const user = await RegisterModel.findByIdAndDelete(req.params.id)
            res.status(200).json('delete successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController