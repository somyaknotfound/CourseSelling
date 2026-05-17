const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");




function adminMiddleware(req,res,next) {
    const token = req.headers.token;
    

    if (!token) {
        return res.status(403).json({
            message: "Token missing"
        })
    }

    try {

        const decoded = jwt.verify(token , JWT_ADMIN_PASSWORD);

        req.adminId = decoded.id;
        next();

        
    } catch (error) {
        return res.status(403).json({
            message: "You are not signed in"
        })
    }


}



module.exports = {
    adminMiddleware
}