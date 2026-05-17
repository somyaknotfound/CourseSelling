const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");


// POST /signup — Register a new admin
adminRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await adminModel.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error creating admin",
            error: error.message,
        });
    }
});


// POST /signin — Authenticate admin and return a JWT
adminRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, {
            expiresIn: "7d",
        });

        res.json({
            message: "Signin successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error during signin",
            error: error.message,
        });
    }
});


// POST /course — Create a new course (admin only)
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    try {
        const { title, description, imageUrl, price } = req.body;

        if (!title || !description || !imageUrl || price == null) {
            return res.status(400).json({ message: "All course fields are required" });
        }

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: req.adminId,
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating course",
            error: error.message,
        });
    }
});


// PUT /course — Update an existing course (admin only, must be creator)
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    try {
        const { courseId, title, description, imageUrl, price } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "courseId is required" });
        }

        const result = await courseModel.updateOne(
            { _id: courseId, creatorId: req.adminId },
            { title, description, imageUrl, price }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found or you are not authorized to update it",
            });
        }

        res.json({ message: "Course updated successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error updating course",
            error: error.message,
        });
    }
});


// DELETE /course/:courseId — Delete a course (admin only, must be creator)
adminRouter.delete("/course/:courseId", adminMiddleware, async function (req, res) {
    try {
        const { courseId } = req.params;

        const result = await courseModel.deleteOne({
            _id: courseId,
            creatorId: req.adminId,
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Course not found or you are not authorized to delete it",
            });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting course",
            error: error.message,
        });
    }
});


// GET /course/bulk — Get all courses created by the authenticated admin
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    try {
        const courses = await courseModel.find({ creatorId: req.adminId });

        res.json({ courses });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message,
        });
    }
});


module.exports = {
    adminRouter,
};