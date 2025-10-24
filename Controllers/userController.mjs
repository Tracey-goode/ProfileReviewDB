import Review from "../Schema/review.mjs";
import User from "../Schema/Users.mjs";
import mongoose from "mongoose";

//update user info
const update = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }

        if (req.body.bio !== undefined) user.bio = req.body.bio;
        if (req.body.height !== undefined) user.height = req.body.height;
        if (req.body.weight !== undefined) user.weight = req.body.weight;
        if (req.body.kink !== undefined) user.kink = req.body.kink;

        const updateUser = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updateUser.id,
                email: updateUser.email,
                bio: updateUser.bio,
                height: updateUser.height,
                weight: updateUser.weight,
                kink: updateUser.kink,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "update error" })
    }
};

// get user profile

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "bio height weight kink"
        );

        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }

        const myReviews = await Review.find({
            reviewerId: req.user.id,
            status: "visible"
        })
            .select("rating text createdAt")
            .sort({ createdAt: -1 });

        const recReviews = await Review.find({
            reviewedUserId: req.user.id,
            status: "visible"
        })
            .select("rating text createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            user,
            myReviews,
            recReviews
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to get Profile" })
    }
};


// delete account

const deleteAcc = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }

        await User.deleteOne({ _id: req.user.id });

        await Review.deleteMany({ reviewerId: req.user.id });

        res.status(200).json({ message: "account deleted!!", token: null }); //token is removed from storage after deletion
    } catch (err) {
        res.status(500).json({ message: "failed to delete account" });
    }
}
// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Admin can see all fields including email
        if (req.user.isAdmin) {
            const users = await User.find()
                .select("email bio height weight kink createdAt");
            return res.status(200).json({ users });
        }

        // Non-admin users can only see public profile fields
        const users = await User.find()
            .select("bio height weight kink createdAt");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const user = await User.findById(req.params.id)
            .select("email bio height weight kink createdAt");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reviews = await Review.find({
            reviewedUserId: req.params.id,
            status: "visible"
        })
            .select("rating text createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            user,
            reviews
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
};

export { update, getProfile, deleteAcc, getAllUsers, getUserById };