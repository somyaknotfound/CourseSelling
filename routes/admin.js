const { Router } = require("express");
const adminRouter = Router();




adminRouter.post("/signup", function(req, res) {
    res.json({
        message: "admin signup Endpoint"
    });
});

adminRouter.post("/signin", function(req, res) {
    res.json({
        message: "admin signin Endpoint"
    });
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