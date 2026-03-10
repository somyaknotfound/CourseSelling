const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup Endpoint"
    });
});


userRouter.post("/signin", function(req, res) {
    res.json({
        message: "signin Endpoint"
    });
});


userRouter.post("/purchases", function(req, res) {
    res.json({
        message: "purchases Endpoint"
    });
});



module.exports = {
    userRouter: userRouter
};