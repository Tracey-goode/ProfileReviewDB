import Users from "../Schema/Users.mjs";
import review from "../Schema/review.mjs";

const allUsers = async (req, res) => {
    try{
        const users = await Users.find().select("-password");
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: "failed to get users"})
    }
};

const delUser = async (req, res) => {
    try{
        const user = await Users.findById(req.params.userId);
        if(!user)
            return res.status(404).json({ message: "User not Found"});

        await review.deleteMany({ $or: [{ reviewerID: user.id}, {reviewedUserId: user.id}] })
        await user.deleteOne();

        res.status(200).json({ message: "User and their reviews deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete users"});
    }
};

const delReview = async (req, res) => {
    try {
        const review = await review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found"})

        await review.deleteOne();
        res.status(200).json({ message: "Review Deleted"})
    } catch (err) {
        res.status(500).json({message: "Failed to delete Review"});
    }
};

const getReportedReviews = async (req, res) => {
    try {
        const reportedReviews = (await review.find({ status: "reported" })).toSorted({createdAt: -1});
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: "Failed to get reported Review" });
    }
};

export {allUsers, delUser, delReview, getReportedReviews};