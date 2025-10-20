import jwt from "jsonwebtoken";
import User from "../Schema/Users.mjs";

export const protect = async (req, res, next) => {
    let token;
    //Extracting Credentials from Auth header ?. checks if something exists without throwing the err or crashing
    if (req.headers.authorization?.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]; //bearer token
            
            //declare token to verify and decode
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            return next();

        }catch(error){
            return res.status(401).json({message: "Invalid or expired token"})
        }
    }

    res.status(401).json({message: "Not authorized, no token"});
};