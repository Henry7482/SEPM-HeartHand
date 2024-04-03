import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const BlogModel = mongoose.model("blogs", blogSchema);

app.get("/blogs", async (req, res) => {
  const blogs = await BlogModel.find();
  res.json(blogs);
});
