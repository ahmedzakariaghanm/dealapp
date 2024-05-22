const mongoose = require('mongoose')
const propertySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'],
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const RequestModel = mongoose.model('request', propertySchema)
const AdsModel = mongoose.model('ads', propertySchema)
module.exports = { RequestModel, AdsModel }