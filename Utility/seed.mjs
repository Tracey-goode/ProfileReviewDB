import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../Connection/db.mjs";
import User from "../Schema/Users.mjs";

dotenv.config();
connectDB();

try {
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (adminExists) {
        console.log("⚠️ Admin already exists");
    } else {
        const hashedPassword = await bcrypt.hash("Admin123!", 10);
        const admin = await User.create({
            username: "AdminUser",
            email: "admin@example.com",
            password: hashedPassword,
            isAdmin: true,
        });
        console.log("✅ Admin created:", admin.email);
    }
} catch (err) {
    console.error("❌ Seeder failed:", err.message);
}

mongoose.connection.close();