import express from "express";
import { protect } from "../Middleware/authMidd.mjs";
import { adminAuth } from "../Middleware/adminMidd.mjs";
import { allUsers, delUser, delReview, getReportedReviews } from "../Controllers/adminControl.mjs";

const router = express.Router();

router.get("/users", protect, adminAuth, allUsers);

router.delete("/users/:userId", protect, adminAuth, delUser);

router.delete("/review/:reviewId".protect, adminAuth, delReview);

router.get("reviews/reported", protect, adminAuth, getReportedReviews);


export default router;