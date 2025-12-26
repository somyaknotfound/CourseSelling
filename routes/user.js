const Router = require("express")

const userRouter = Route();

        userRouter.post("/signup" , function(req,res) {
            res.json({
                message:"signup Endpoint"
            })
        })


        userRouter.post("/signin" , function(req,res) {
            res.json({
                message:"signup Endpoint"
            })
        })


        userRouter.post("/purchases" , function(req,res) {
            res.json({
                message:"signup Endpoint"
            })
        })  



module.exports = {
    userRouter:userRouter
}