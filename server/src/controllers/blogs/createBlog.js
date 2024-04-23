import Blog from "../../models/Blog.js";

const createBlog = async (req, res) => {
  try {
    const blog = req.body;
    const output = await Blog.create(blog);
    res.status(200).json({message: "Successfully added blog", output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
