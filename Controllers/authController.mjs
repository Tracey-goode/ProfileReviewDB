import jwt from "jsonwebtoken";
import User from "../Schema/Users.mjs";


const generateToken = (user) => {
    jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User Exists" });

        const user = await User.create({ email, password });

        const token = generateToken(user);

        res.status(201).json({ token, user: { id: user.id, email, isAdmin: user.isAdmin, }, });

    } catch (error) {
        res.status(500).json({ error: "Registration Failed" })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password)))
            return res.status(400).json({ message: "Invalid Email or Password" });

        const token = generateToken(user.id);

        res.status(200).json({ token, user: { id: user.id, email: user.email } })

    } catch (error) {
        res.status(500).json({ error: "Login Failed" })
    }
}

export { register, login };