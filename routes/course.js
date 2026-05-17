const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel } = require("../db");

const courseRouter = express.Router();

courseRouter.post("/purchase",userMiddleware, async function(req, res) {


    // you would expect to pay money

    const userId = req.userId;
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId,
        courseId
    })


    res.json({
        message: "You have successfully bought the course"
    });
});


courseRouter.get("/courses", function(req, res) {
    res.json({
        message: "courses list Endpoint"
    });
});

courseRouter.get("/preview" ,  async function(req,res) {


    const courses = await courseModel.find({});



    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter
};