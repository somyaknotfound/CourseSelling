const { Router } = require("express");
const adminRouter = Router();
// bcrypt zod jsonwebtoken for jwt
const bcrypt = require("bcrypt");
const { adminModel , courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMiddleware } = require("../middlewares/admin");



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
            }, JWT_ADMIN_PASSWORD);

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


// course should be made after signin
adminRouter.post("/course", adminMiddleware , async function(req, res) {

    const {title , description , imageUrl , price}  = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: req.adminId

    });


    res.json({
        message: "course created",
        courseId : course._id
    });
});



/* 

PUT /course
↓
middleware verifies admin
↓
extract courseId + updates
↓
find course
↓
if course not found → 404
↓
if creatorId != req.adminId → 403
↓
update fields
↓
save
↓
success response

*/

adminRouter.put("/course", adminMiddleware, async function(req, res) {

    const authenticatedAdminId = req.adminId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const result = await courseModel.updateOne(
        {
            _id: courseId,
            creatorId: authenticatedAdminId
        },
        {
            title,
            description,
            imageUrl,
            price
        }
    );

    if (result.matchedCount === 0) {
        return res.status(403).json({
            message: "Not authorized or course not found"
        });
    }

    res.json({
        message: "Course updated successfully"
    });

});

adminRouter.get(
    "/course/bulk",
    adminMiddleware,
    async function(req, res) {

        const authenticatedAdminId = req.adminId;


        const courses = await courseModel.find({
            creatorId: authenticatedAdminId
        });


        if (courses.length === 0) {
            return res.status(404).json({
                message: "No courses found"
            });
        }


        res.json({
            courses: courses
        });

    }
);



module.exports = {
    adminRouter : adminRouter
}