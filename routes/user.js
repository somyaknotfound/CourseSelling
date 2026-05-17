const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const {userModel , purchaseModel} = require("../db");
const {JWT_USER_PASSWORD} = require("../config");

const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");


userRouter.post("/signup",  async function(req, res) {
    try {
        const {email , password ,firstName , lastName } = req.body;

        const hashedPassword = await bcrypt.hash(password , 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName : lastName
        })

        res.json({
            message:"Signup complete"
        })



        
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
});


userRouter.post("/signin",  async function(req, res) {
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({ email: email});  //find searches for all returns an empty array use findOne 

        if (!user) {
            return res.status(403).json({
                message:"User not found"
            })
        }

        const passwordMatch = await bcrypt.compare(password , user.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect Password"
            })
        }
        
        if (user) {
            const token = jwt.sign({
              id: user._id 
            } , JWT_USER_PASSWORD);

            // cookie logic

            res.json({
                token: token
            })
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }

        res.json({
            message: "Signin Successfull",
            token
        })




        


        
    } catch (error) {
        res.status(500).json({
            message: "Error in signin",
            error : error.message
        })
    }
});


userRouter.post("/purchases",userMiddleware, async function(req, res) {
    const userId = req.userId;


    const purchases = await purchaseModel.find({
            userId,
            
        })




    res.json({
        purchases
    });
});



module.exports = {
    userRouter: userRouter
};