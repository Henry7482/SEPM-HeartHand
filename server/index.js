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
  donationRouter,
} from "./src/routes/index.js";
import {
  upload,
  uploadImageToCloudinary,
} from "./src/services/uploadImages.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());

// Allow preflight requests for all routes
app.options(
  "*",
  cors({
    origin: "*", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

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

// app.post('/api/v1/uploadImage', upload.single('image'), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const imageUrl = await uploadImageToCloudinary(file.buffer);
//     console.log('Image URL:', imageUrl);
//     res.status(200).json({ imageUrl: imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).send('Error uploading image.');
//   }
// });

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
