import User from "../Schema/Users.mjs";
import generateToken from "../Utility/gentoken.mjs";
import { hashPassword, matchPassword } from "../Utility/hashPassword.mjs";

//register
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User Exists" });
        }

        const hashed = await hashPassword(password);
        const user = await User.create({ email, password: hashed });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: "Registration Error" });
    }
};

// Login User 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); //defines user email

        if (!user || !(await matchPassword(password, user.password))) { // user email and password + hash is not true based off json below then invalid!
            res.status(401).json({ message: "Invalid Email or Password" })
        }
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Login Error " });
    }
};