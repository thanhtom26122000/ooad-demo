const mongoose = require('mongoose')
const { default: Config } = require('../../config')

const apartmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    rate: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true,
        index: true
    },
    district: {
        type: String,
        require: true,
        index: true
    },
    addressDetail: {
        type: String,
        require: true
    },
    pricePer: {
        type: String,
        require: true
    },
    electricPrice: {
        type: Number,
        require: true
    },
    waterPrice: {
        type: Number,
        require: true
    },
    size: {
        type: Number,
        require: true,
        index: true,
    },
    userId: {
        type: String,
        require: true,
        index: true
    },
    createTime: {
        type: Number,
        require: true
    },
    isApprove: {
        type: Number,
        require: true,
        default: Config.WAIT_APPROVE
    },
    imagePath: {
        type: Array,
        require: true
    },
    bedroom: {
        type: String,
        require: true
    },
    bathroom: {
        type: String,
        require: true
    },
    expiredDate: {
        type: Date,
        require: true
    },
    note: {
        type: String,
    }
})

apartmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = Apartment