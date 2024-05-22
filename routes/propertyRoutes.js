const { Router } = require("express")
const { getMatches } = require("../controllers/propertyController")
const router = Router()

router.get("/property/:id", getMatches)

module.exports = router