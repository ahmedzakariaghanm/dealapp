const { RequestModel } = require("../models/propertyModel")
// - Implement an endpoint for creating property requests used by clients only.
const createRequest = async (req, res) => {
    try {
        let request = req.body
        request = await RequestModel(request).save()
        res.status(201).json({
            propertyRequest: request
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}
// - Implement an endpoint for updating property requests (description - area - price).
const updateRequest = async (req, res) => {
    try {
        let propertyRequest = req.body
        let currentPropertyRequest = await RequestModel.findOneAndUpdate({
            _id: req.params.id,
            userId: propertyRequest.userId
        }, {
            description: propertyRequest.description,
            area: propertyRequest.area,
            price: propertyRequest.price,
        }, {
            upsert: false,
            new: true,
        })
        if (!currentPropertyRequest) {
            throw "no resource found"
        }
        res.status(200).json({
            propertyRequest: currentPropertyRequest
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}

module.exports = {
    createRequest,
    updateRequest
}