import Review from "../Schema/review.mjs";


// Create a new (anon) Review

export const createReview = async (req, res) => {
    const {reviewedUserId, rating, text} = req.body;

    try {
        const review = await Review.create({
            reviewerId: req.user._id,
            reviewedUserId, 
            rating,
            text,
        });

        res.status(201).json({
            message: "Review Created Successfully",
            review: {
                id: review._id,
                reviewedUserId: review.reviewedUserId,
                rating: review.rating,
                text: review.text,
                createdAt: review.createdAt,
            },
        });
    } catch(err) {
        res.status(500).json({error: "Failed to Create Review", details: err.message});
    }
};

export const getReviewsForUser = async (req, res) => {
    try {
        const reviews = await Review.find({
            reviewedUserId: req.params.userId,
            status: "visible",
        })
            .select("-reviewerId") // keep it anonymous
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews", details: err.message });
    }
};

// Report a review
export const reportReview = async (req, res) => {
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