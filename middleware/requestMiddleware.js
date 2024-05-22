const isClient = (req, res, next) => {
    if ("CLIENT" == req.body.role) {
        next();
    }
    else {
        res.status(401).json({ message: "You don't have access for this operation" })
    }
}

module.exports = { isClient }