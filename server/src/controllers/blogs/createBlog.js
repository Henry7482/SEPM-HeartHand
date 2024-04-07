import Blog from "../../models/Blogs.js";
import genrerateBLog from "../../ai/generateBlog.js";

const newBlogInstance = async () => {
  const keywords = ["test", "blog"];
  const references = ["test", "blog"];
  const imageURL = null;
  const defaultImageURL = "https://www.defaultURL.com";
  const rawBlogs = await genrerateBLog(keywords);

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
    const blog = await newBlogInstance();
    const output = await Blog.create(blog);
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
