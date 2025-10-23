import express from "express";
import { register, login } from "../Controllers/authController.mjs";
import { validateRegisterInput, validateLoginInput } from "../Middleware/ValidateUserInput.mjs";


const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);

export default router;