require("dotenv").config();

const express = require("express");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use("/user", userRouter);
// gets handeled by userRouter

app.use("/course", courseRouter );
app.use("/admin" ,adminRouter);

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