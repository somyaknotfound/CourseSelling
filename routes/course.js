// const express = require("express");
// const Router = express.Router;
const Router = require("express");

    const courseRouter = Router();

        courseRouter.post("/purchase" , function(req,res) {
        // you would expect to pay money
        res.json({
            message:"signup Endpoint"
            })
        })  


        courseRouter.get("/courses" , function(req,res) {
            res.json({
                message:"signup Endpoint"
            })
        })  


    module.exports = {
        courseRouter:courseRouter
    }