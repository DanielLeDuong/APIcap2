const mongoose = require('mongoose')

const userDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,   
    },
    phoneNumber: {
        type: String,
        require: true,
    }
},{ timestamps: true })

const UserDetailModal = mongoose.model('user-detail', userDetailSchema)

module.exports = UserDetailModal