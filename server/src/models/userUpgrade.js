const mongoose = require('mongoose')
const Config = require('../../config')
const userUpgradeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cardId: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        require: false,
    },
    address: {
        type: String,
        require: false
    },
    personImagePath: {
        type: String,
        require: true
    },
    idCardImagePath: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true,
        default: Config.NOT_VERIFY
    }
})

userUpgradeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserUpgrade = mongoose.model('UserUpgrade', userUpgradeSchema)

module.exports = UserUpgrade