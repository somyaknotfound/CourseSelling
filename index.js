require("dotenv").config();

const express = require("express");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { connectDB } = require("./db");
const cookieParser = require("cookie-parser");

// express routes and middlewares
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// express middle ware needed to get body requests from the post request being sent by client
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
// gets handeled by userRouter

app.use("/api/v1/course", courseRouter );
app.use("/api/v1/admin" ,adminRouter);
// db connection
async function startServer() {
	try {
		await connectDB(MONGO_URI);
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
}

startServer();