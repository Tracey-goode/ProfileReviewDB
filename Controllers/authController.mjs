import jwt from "jsonwebtoken";
import User from "../Schema/Users.mjs";

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        
    } catch (error) {
        res.status(500).json({ error: "Registration Failed" })
    }
}