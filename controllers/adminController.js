const { AdsModel, RequestModel } = require("../models/propertyModel")
const { UserModel } = require("../models/userModel")

const getAdminStats = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        let query = {
            role: {
                $in: ["AGENT", "CLIENT"]
            },
            status: "ACTIVE",

        };
        const offset = (page - 1) * limit;
        const users = await UserModel.aggregate().facet({
            data: [{ $match: query }, { $sort: { "updatedAt": -1 } }, { $skip: offset }, { $limit: Number(limit) }, { $project: { "__v": 0, "createdAt": 0, "password": 0 } }],
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
        if (page * limit < users[0].metadata[0].total) {
            hasNextPage = true
        }
        let data = await Promise.all(users[0].data.map(async (user) => {
            let clientStats = {
                requestsCount: 0,
                totalRequestsAmount: 0,
            }
            let agantStats = {
                adsCount: 0,
                totalAdsAmount: 0,
            }
            // let userid = user._id.toString()
            if (user.role == "CLIENT") {
                clientStats = await getClientStats(user._id)
            } else if (user.role == "AGENT") {
                agantStats = await getAgentStats(user._id)
            }
            user = {
                ...user,
                ...clientStats,
                ...agantStats,
            }
            return user
        }))
        res.status(200).json({
            data,
            ...users[0].metadata[0],
            hasNextPage,
            hasPreviousPage
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}

const getClientStats = async (id) => {
    //requests stats
    const requestStats = await RequestModel.aggregate().facet({
        result: [{ $match: { userId: id.toString(), } }, {
            $group: {
                _id: id,
                requestsCount: { $sum: 1 },
                totalRequestsAmount: { $sum: "$price" }
            }
        }],
    })
    return requestStats[0].result[0]
}

const getAgentStats = async (id) => {
    //ads stats
    const adStats = await AdsModel.aggregate().facet({
        result: [{ $match: { userId: id.toString(), } }, {
            $group: {
                _id: id,
                adsCount: { $sum: 1 },
                totalAdsAmount: { $sum: "$price" }
            }
        }],
    })
    return adStats[0].result[0]
}
module.exports = {
    getAdminStats
}