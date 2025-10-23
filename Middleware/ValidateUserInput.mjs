import { validateEmail } from "../Utility/validateEmail.mjs";
import { validatePassword } from "../Utility/validatepassword.mjs";

export const validateRegisterInput = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Required Fields" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ message: "Password must be 6 characters long" })
    }

    next();
};

export const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" })
    }
    next();
};