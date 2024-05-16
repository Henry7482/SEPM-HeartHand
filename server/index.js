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
  generatedBlogsRouter,
  donationRouter
} from "./src/routes/index.js";
import {jwtAuthAdmin, jwtAuthDonor} from "./src/middlewares/cookiejwtAuth.js";
import cookieParser from "cookie-parser";
import { getGeneratedBlogs } from "./src/controllers/blogs/generatedBlogs.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials to be sent
  optionsSuccessStatus: 204 // For legacy browsers
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());

// App Routes
app.get("/api/v1/", (req, res) => {
  res.send("Welcome to the HeartHand API!");
});
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/scraperdata", scraperRouter);
app.use("/api/v1/organizations", organizationsRouter);
app.use("/api/v1/delivery", deliveryRouter);
app.use("/api/v1/generatedblogs", generatedBlogsRouter);
app.use("/api/v1/donations", donationRouter);


app.get("/secret", jwtAuthDonor, (req, res) => {
  res.send({"Welcome to the secret page": req.userID});
});

// Start Function
const start = async () => {
  try {
    await connectDB();
    // console.log("No Mongo")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// Start the server
start();
