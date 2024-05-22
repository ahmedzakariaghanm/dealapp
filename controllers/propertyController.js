const { AdsModel, RequestModel } = require("../models/propertyModel")
// - Implement an endpoint that matches property requests with relevant ads based on district, price, and area.

const getMatches = async (req, res) => {
    try {
        let adsId = req.params.id
        ads = await AdsModel.findById(adsId)
        if (!ads) {
            throw "ads doesn't exists"
        }
        // i assume that customer will be interested in propertyType same as his ads
        let { district, price, area, propertyType } = ads
        let priceTolerance = price / 10
        startPriceRange = price - priceTolerance
        endPriceRange = price + priceTolerance
        const { limit = 10, page = 1 } = req.query;
        let query = {
            district,
            price: {
                $gte: startPriceRange,
                $lte: endPriceRange,
            },
            area,
            propertyType
        };
        const offset = (page - 1) * limit;
        const requests = await RequestModel.aggregate().facet({
            data: [{ $match: query }, { $sort: { "updatedAt": -1 } }, { $skip: offset }, { $limit: Number(limit) }, { $project: { "__v": 0, "createdAt": 0 } }],
            metadata: [{ $match: query }, { $count: "total" }, {
                $addFields: {
                    page: Number(page),
                    limit: Number(limit),
                }
            }],
        })
        let hasNextPage = false
        let hasPreviousPage = false
        if (page != 1) {
            hasPreviousPage = true
        }
        if (page * limit < requests[0].metadata[0].total) {
            hasNextPage = true
        }
        res.status(200).json({
            data: requests[0].data,
            ...requests[0].metadata[0],
            hasNextPage,
            hasPreviousPage
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}
module.exports = {
    getMatches
}