import User from "../Schema/Users.mjs";
import generateToken from "../Utility/gentoken.mjs";
import { hashPassword, matchPassword } from "../Utility/hashPassword.mjs";
import {validateEmail } from "../Utility/validateEmail.mjs";

export const registerUser = async (req, res) => {
    const { email, password} = req.body;

    try{

        if(!validateEmail(email)) {
            return res.status(400).json({message: "Invalid Email"});
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User Exists"});
        }

        const hashed = await hashPassword(password);
        const user = await User.create({ email, password: hashed });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};

// Login User 
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await User.findOne({email});
        if (user && (await matchPassword(password, user.password))) {
             res.json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({message: "Invalid Email or Password"})
        }
    } catch (err) {
        res.status(500).json({message: "Server Error 2"});
    }
};