import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./connection/db.mjs";
import authRoutes from "./Routes/authRoutes.mjs";
import reviewRoutes from "./Routes/reviewRoutes.mjs";
import userRoutes from "./Routes/userRoutes.mjs";
import { globalError } from "./Middleware/globalErr.mjs";

//setup
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();


//middleware 
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("api/user", userRoutes);



app.use(globalError);



app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));