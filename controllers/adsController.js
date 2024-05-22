const { AdsModel } = require("../models/propertyModel")
// - Implement an endpoint for creating ads used by agents only.
const createAds = async (req, res) => {
    try {
        let ads = req.body
        ads = await AdsModel(ads).save()
        res.status(201).json({
            propertyAds: ads
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}
module.exports = {
    createAds
}