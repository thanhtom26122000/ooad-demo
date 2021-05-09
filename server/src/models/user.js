const mongoose = require('mongoose')
const Config = require('../../config')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: Config.MEMBER_ACCOUNT
    },
    listFavo: {
        type: Array,
        default: [],
        require: false,
    },
    typeAccount: {
        type: Number,
        require: true
    }

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User