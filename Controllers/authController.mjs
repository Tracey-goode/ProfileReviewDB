import jwt from "jsonwebtoken";
import User from "../Schema/Users.mjs";

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });

export const register = async (req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User Exists"});
        const user = await User.create({ email, password});
        const token = generateToken(user._id);
        res.status(201).json({token, user: {id: user._id, email}});

    } catch (error) {
        res.status(500).json({error: "Registration Failed"})
    }
};

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne ({email});
        if(!user || !(await user.matchPassword(password)))
            return res.status(400).json({message: "Invalid Email or Password"});
        const token = generateToken(user._id);
        res.status(200).json({token, user: {id: user._id, email: user.email }})
    } catch (error) {
        res.status(500).json({error: "Login Failed"})
    }
}