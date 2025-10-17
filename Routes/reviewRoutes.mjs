import express from "express";
import { createReview, getReviewsForUser, reportReview } from "../Controllers/reviewcontroller.mjs";
import { protect } from "../Middleware/authMidd.mjs";


const router = express.Router();

router.post("/", protect, createReview); //create

router.get("/:userId", protect, getReviewsForUser); //get all reviews

router.put("/report/:reviewId", protect, reportReview); // report a review

export default router;