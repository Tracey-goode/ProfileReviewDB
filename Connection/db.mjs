import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// console.log(" db.mjs loaded, MONGO_URI =", process.env.MONGO_URI);

const connectionString = process.env.MONGO_URI || "";

const connectDB = async() => {
    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default connectDB;