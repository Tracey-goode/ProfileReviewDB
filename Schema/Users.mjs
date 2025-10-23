import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, maxlength: 100, default: "" },
    height: { type: Number },
    weight: { type: Number },
    kink: { type: String },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });


export default mongoose.model("User", userSchema)