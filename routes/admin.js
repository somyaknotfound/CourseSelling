const { Router } = require("express");
const adminRouter = Router();
// bcrypt zod jsonwebtoken for jwt
const bcrypt = require("bcrypt");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "121243214"




adminRouter.post("/signup", async function(req, res) {
    
    try {
        const { email , password , firstName , lastName } = req.body; //add zod validation
    
        const hashedPassword = await bcrypt.hash(password , 10);
    
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
    
        res.json({
            message: "Admin created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating admin",
            error: err.message
        });
    }
});

adminRouter.post("/signin", async function(req, res) {
        try {
            const {email , password}  = req.body
    
            const admin = await adminModel.findOne({ email : email});
    
            if (!admin) {
                return res.status(403).json({
                    message: "Admin is not there"
                })
            }

            const passwordMatch = await bcrypt.compare(password , admin.password);

            if (!passwordMatch) {
                return res.status(403).json({
                    message: "Incorrect credentials"
                });
            }

            const token = jwt.sign({
                id: admin._id
            }, process.env.JWT_ADMIN_PASSWORD);

            res.json({
                token: token
            });

        } catch (error) {
            res.status(500).json({
                message: "Couldnt signin",
                error: error.message
            })
        }


});

adminRouter.post("/course", function(req, res) {
    res.json({
        message: "add Course"
    });
});


adminRouter.put("/course", function(req, res) {
    res.json({
        message: "Change course content"
    });
});

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "see course content"
    });
});



module.exports = {
    adminRouter : adminRouter
}