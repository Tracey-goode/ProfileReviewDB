import express from "exoress"
import { registerUser, loginUser } from "../Controllers/userController.mjs";
import { validateRegisterInput, validateLoginInput } from "../Middleware/ValidateUserInput.mjs";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);

export default router;