import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortform: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  references: {
    type: Array,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
});

const dashboardDB = mongoose.connection.useDb("dashboard");
const Blog = dashboardDB.model("blogs", blogSchema);

export default Blog;
