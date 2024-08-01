const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" });
        req.user = payload.id;
        next();
    });
    return { token };
};

module.exports = {
    verifyToken,
};