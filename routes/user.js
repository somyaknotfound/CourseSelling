const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");


// POST /signup — Register a new user
userRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({ message: "Signup complete" });
    } catch (error) {
        res.status(500).json({
            message: "Error during signup",
            error: error.message,
        });
    }
});


// POST /signin — Authenticate user and return a JWT
userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, {
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


// GET /purchases — Get all courses purchased by the authenticated user
userRouter.get("/purchases", userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({ userId });

        const courseData = await courseModel.find({
            _id: { $in: purchases.map((p) => p.courseId) },
        });

        res.json({ purchases, courseData });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching purchases",
            error: error.message,
        });
    }
});


module.exports = {
    userRouter,
};