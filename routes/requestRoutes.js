const { Router } = require("express")
const { createRequest, updateRequest } = require("../controllers/requestController")
const router = Router()
const { isClient } = require('../middleware/requestMiddleware')

router.post("/request", isClient, createRequest)
router.put("/request/:id", isClient, updateRequest)

module.exports = router