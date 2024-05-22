const { Router } = require("express")
const { getAdminStats } = require("../controllers/adminController")
const router = Router()
const { isAdmin } = require('../middleware/adminMiddleware')

router.get("/stats", isAdmin, getAdminStats)

module.exports = router