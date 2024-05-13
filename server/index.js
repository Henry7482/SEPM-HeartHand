import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import {
  blogRouter,
  scraperRouter,
  organizationsRouter,
  userRouter,
  deliveryRouter,
} from "./src/routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// App Routes
app.get("/api/v1/", (req, res) => {
  res.send("Welcome to the HeartHand API!");
});
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/scraperdata", scraperRouter);
app.use("/api/v1/organizations", organizationsRouter);
app.use("/api/v1/delivery", deliveryRouter);

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
