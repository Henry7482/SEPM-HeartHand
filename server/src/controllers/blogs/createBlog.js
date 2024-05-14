import Blog from "../../models/Blog.js";
import {upload} from "../../models/uploadImages.js";

const createBlog = async (req, res) => {
  try {
    const imageURL = await uploadImagesToCloudinary('file image bỏ vào đây');
    const blog = new Blog({
      title: req.title, 
      shortform: req.shortform,
      content: req.content,
      date: new Date(),
      keywords: req.keywords,
      references: req.references,
      imageURL: imageURL || defaultImageURL,
    });
    const output = await Blog.create(blog);
    res.status(200).json({message: "Successfully added blog", output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
