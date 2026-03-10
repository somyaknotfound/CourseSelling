const express = require("express");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
// gets handeled by userRouter

app.use("/course", courseRouter );

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});