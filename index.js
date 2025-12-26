
const express = require("express")
const CreateCourseRoutes = require("./routes/course")
const CreateUserRoutes = require("./routes/user")
const app = express()



app.use("/user",userRouter);
app.use("/course",courseRouter);



CreateUserRoutes(app);
CreateUserRoutes(app);


app.listen(3000)