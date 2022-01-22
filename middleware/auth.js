const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../errors');

const authenticationMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ msg: "No token", "status": "failed" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const { id, username } = decode
        req.user = { id, username }
        next()
    } catch (e) {
        res.status(401).json({ msg: "Not authorized to access this route", "status": "failed" })
    }
}

module.exports = authenticationMiddleware