import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection/db.mjs";
import authRoutes from "./Routes/authRoutes.mjs";
import reviewRoutes from "./Routes/reviewRoutes.mjs";

const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));