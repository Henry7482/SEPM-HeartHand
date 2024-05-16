import Blog from "../../models/Blog.js";
import { uploadImage } from "../../models/uploadImages.js";

const newBlogInstance = async () => {
  const keywords = ["test", "blog"];
  const references = ["test", "blog"];
  const imageURL = null;
  const defaultImageURL = "https://www.defaultURL.com";
  const rawBlogs =  {};

  const blog = new Blog({
    title: rawBlogs.title,
    shortform: rawBlogs.shortform,
    content: rawBlogs.content,
    date: new Date(),
    keywords: keywords,
    references: references,
    imageURL: imageURL || defaultImageURL,
  });
  return blog;
};

const createBlog = async (req, res) => {
  try {    
    const output = await Blog.create({
      title: req.body.title,
      shortform: req.body.shortform,
      content: req.body.content,
      date: new Date(),
      tags: req.body.tags,
      references: req.body.references,
      imageURL: req.body.imageURL,
    });
    res.status(200).json({ message: "Successfully added blog", output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
