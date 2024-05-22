const isAgent = (req, res, next) => {
    if ("AGENT" == req.body.role) {
        next();
    }
    else {
        res.status(401).json({ message: "You don't have access for this operation" })
    }
}

module.exports = { isAgent }