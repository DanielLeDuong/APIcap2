const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,   
    },
    confirmPassword: {
        type: String,
        require: true,
    },
    role: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true })

const RegisterModel = mongoose.model('registers', registerSchema)

module.exports = RegisterModel