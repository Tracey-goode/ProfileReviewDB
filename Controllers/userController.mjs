import Review from "../Schema/review.mjs";
import User from "../Schema/Users.mjs";


// //register
// const registerUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User Exists" });
//         }

//         const hashed = await hashPassword(password);
//         const user = await User.create({ email, password: hashed });

//         res.status(201).json({
//             id: user.id,
//             email: user.email,
//             token: generateToken(user.id),
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Registration Error" });
//     }
// };

// // Login User 
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email }); //defines user email

//         if (!user || !(await matchPassword(password, user.password))) { // user email and password + hash is not true based off json below then invalid!
//             res.status(401).json({ message: "Invalid Email or Password" })
//         }
//         res.json({
//             id: user.id,
//             email: user.email,
//             token: generateToken(user.id),
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Login Error " });
//     }
// };

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
            reviewedUserId: req.params.userId,
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

        await User.deleteOne({ id: req.user.id });

        await Review.deleteMany({ reviewerId: req.user.id });

        res.status(200).json({ message: "account deleted!!", token: null }); //token is removed from storage after deletion
    } catch (err) {
        res.status(500).json({ message: "failed to delete account" });
    }
}
export { update, getProfile, deleteAcc };