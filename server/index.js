import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import {blogRouter, scraperRouter, organizationsRouter} from "./src/routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// App Routes
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/scraperdata", scraperRouter);
app.use("/api/v1/organizations", organizationsRouter);


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
