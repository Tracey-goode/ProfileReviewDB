import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        reviewerId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reviewedUserId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rating:
        {
            type: Number,
            min: 1,
            max: 5,
            required: false
        },
        text:
        {
            type: String,
            required: false,
            maxlength: 250
        },
        status:
        {
            type: String,
            enum: ["visible", "reported", "hidden"], default: "visible"
        }
    },
    {timestamps: true}
);

export default mongoose.model("Review", reviewSchema);


