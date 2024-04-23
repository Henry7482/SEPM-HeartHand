import mongoose from "mongoose";

const GeneratedBlogSchema = new mongoose.Schema({
  data: [
    {
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
        required: true,
      },
      references: {
        type: Array,
        required: true,
      },
      imageURL: {
        type: String,
        default: "https://www.defaultURL.com",
        required: true,
      }
    }
  ]
});

const dashboardDB = mongoose.connection.useDb("dashboard");
const GeneratedBlogs = dashboardDB.model("generated_blogs", GeneratedBlogSchema);

export default GeneratedBlogs;
