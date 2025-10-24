import express from "express";
import { createReview, getReviewsForUser, reportReview, deleteReview, updateReview } from "../Controllers/reviewcontroller.mjs";
import { protect } from "../Middleware/authMidd.mjs";


const router = express.Router();

router.post("/", protect, createReview); //create

router.get("/:userId", protect, getReviewsForUser); //get all reviews

router.put("/report/:reviewId", protect, reportReview); // report a review

// Update a review - only the author may update their review
router.put("/:reviewId", protect, updateReview);

// Delete a review - only the author may delete their review
router.delete("/:reviewId", protect, deleteReview);

export default router;