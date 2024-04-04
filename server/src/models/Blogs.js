import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const dashboardDB = mongoose.connection.useDb("dashboard");
const Blog = dashboardDB.model("blogs", blogSchema);

export default Blog;
