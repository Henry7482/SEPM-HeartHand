import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import blogRouter from "./src/routes/blogRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/blogs", blogRouter);


const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

export default app;
