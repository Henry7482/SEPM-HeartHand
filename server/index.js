import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import blogRouter from "./src/routes/blogRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// App Routes
app.use("/api/v1/blogs", blogRouter);

// Start Function
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

// Start the server
start();
