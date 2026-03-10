const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" }
});

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "Admin", required: true }
});

const purchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }
});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

async function connectDB(mongoUri) {
    if (!mongoUri) {
        throw new Error("MongoDB connection string is required");
    }
    await mongoose.connect(mongoUri);
}

module.exports = {
    connectDB,
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};