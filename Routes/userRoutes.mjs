import express from "express"
import { register, login } from "../Controllers/authController.mjs";
import { getProfile, update, deleteAcc } from "../Controllers/userController.mjs";
import { validateRegisterInput, validateLoginInput } from "../Middleware/ValidateUserInput.mjs";
import {protect} from "../Middleware/authMidd.mjs";

const router = express.Router();

//User Routes

// --User create account
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);

// --user read account
router.get("/profile", protect, getProfile);

// --user delete
router.delete("/delete", protect, deleteAcc)
// --update user profile route
router.get("/profile", protect, update);


//admin routes



export default router;