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