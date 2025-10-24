import Review from "../Schema/review.mjs";


// Create a new (anon) Review

const createReview = async (req, res) => {
    const { reviewedUserId, rating, text } = req.body;

    try {
        const review = await Review.create({
            reviewerId: req.user.id,
            reviewedUserId,
            rating,
            text,
        });

        res.status(201).json({
            message: "Review Created Successfully",
            review: {
                id: review.id,
                reviewedUserId: review.reviewedUserId,
                rating: review.rating,
                text: review.text,
                createdAt: review.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to Create Review", details: err.message });
    }
};

const getReviewsForUser = async (req, res) => {
    try {
        const reviews = await Review.find({
            reviewedUserId: req.params.userId,
            status: "visible",
        })
                .select("rating text createdAt reviewerId") // return rating/text and keep reviewerId for reference
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews", details: err.message });
    }
};

// Report a review
const reportReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        review.status = "reported";
        await review.save();

        res.status(200).json({ message: "Review reported successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to report review", details: err.message });
    }
};

// Update a review (only the original reviewer can update)
const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, text } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Verify the review belongs to the user
        if (review.reviewerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only edit your own reviews" });
        }

        // Update the review
        review.rating = rating;
        review.text = text;  // Changed from reviewText to text to match schema
        await review.save();

        res.status(200).json({
            message: "Review updated successfully",
            review
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to update review", details: err.message });
    }
};

// Delete a review (only the original reviewer can delete)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Only the reviewer may delete their review
        if (review.reviewerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete review", details: err.message });
    }
};

export { createReview, getReviewsForUser, reportReview, updateReview, deleteReview };