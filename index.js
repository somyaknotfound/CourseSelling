
const express = require("express")

const app = express()


app.post("/user/signup" , function(req,res) {
    res.json({
        message:"signup Endpoint"
    })
})


app.post("/user/signin" , function(req,res) {
    res.json({
        message:"signup Endpoint"
    })
})


app.post("/user/purchases" , function(req,res) {
    res.json({
        message:"signup Endpoint"
    })
})  


app.get("/courses" , function(req,res) {
    res.json({
        message:"signup Endpoint"
    })
})  

app.listen(3000)