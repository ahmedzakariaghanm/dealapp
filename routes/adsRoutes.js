const { Router } = require("express")
const { createAds } = require("../controllers/adsController")
const router = Router()
const { isAgent } = require('../middleware/adsMiddleware')

router.post("/ads", isAgent, createAds)

module.exports = router