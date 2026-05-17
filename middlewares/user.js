const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");


function userMiddleware(req, res, next) {
    // Support both "Authorization: Bearer <token>" and legacy "token: <token>" header
    const authHeader = req.headers.authorization;
    const legacyToken = req.headers.token;

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (legacyToken) {
        token = legacyToken;
    }

    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports = {
    userMiddleware,
};