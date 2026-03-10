const express = require("express");

const courseRouter = express.Router();

courseRouter.post("/purchase", function(req, res) {
    // you would expect to pay money
    res.json({
        message: "purchase Course Endpoint"
    });
});


courseRouter.get("/courses", function(req, res) {
    res.json({
        message: "courses list Endpoint"
    });
});

courseRouter.get("/preview" , function(req,res) {
    res.json({
        message: "Previewing course"
    })
})


module.exports = {
    courseRouter: courseRouter
};