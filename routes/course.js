const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = express.Router();


// POST /purchase — Purchase a course (authenticated users only)
courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "courseId is required" });
        }

        // Check that the course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Prevent duplicate purchases
        const alreadyPurchased = await purchaseModel.findOne({ userId, courseId });
        if (alreadyPurchased) {
            return res.status(409).json({ message: "Course already purchased" });
        }

        await purchaseModel.create({ userId, courseId });

        res.status(201).json({ message: "Course purchased successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error processing purchase",
            error: error.message,
        });
    }
});


// GET /preview — List all available courses (public)
courseRouter.get("/preview", async function (req, res) {
    try {
        const courses = await courseModel.find({});

        res.json({ courses });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message,
        });
    }
});


module.exports = {
    courseRouter,
};