
const express = require("express")

const app = express()

//adding routes

app.post("/user/signup" , function(req,res) {
    res.json({
        message:"signup Endpoint"
    })
})

print("hello");

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