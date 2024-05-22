const { verifyToken } = require("../controllers/authController")
const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            let decodedToken = verifyToken({ token })
            if (decodedToken) {
                req.body.userId = decodedToken.userId
                req.body.role = decodedToken.role
                next();
            } else {
                throw "You need to login first"
            }
        } else {
            throw "You need to login first"
        }
    } catch (e) {
        res.status(401).json({ message: e })
    }
}

module.exports = { requireAuth }