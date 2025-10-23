import jwt from "jsonwebtoken";
import User from "../Schema/Users.mjs";
import { validateEmail } from "../Utility/validateEmail.mjs";
import { validatePassword } from "../Utility/validatepassword.mjs";

// Generate JWT
const generateToken = (user) =>
    jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });

// Register
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        if (!validateEmail(email))
            return res.status(400).json({ message: "Invalid email format" });

        if (!validatePassword(password))
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters, include uppercase, lowercase, and a number",
            });

        // Check for duplicates
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        // Create user
        const user = await User.create({ email, password });

        // Token
        const token = generateToken(user);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", details: err.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (err) {
        res.status(500).json({ message: "Login failed", details: err.message });
    }
};

export { register, login };
