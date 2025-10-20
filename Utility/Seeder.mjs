import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../Schema/Users.mjs";
import connectDB from "../Connection/db.mjs";

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: "admin@example.com" });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin123!", 10);

        const admin = new User({
            username: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            isAdmin: true,
        });

        await admin.save();
        console.log("✅ Admin account created successfully!");
        console.log("Email:", admin.email);
        console.log("Password: Admin123!");
        process.exit();
    } catch (error) {
        console.error("❌ Error creating admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();
