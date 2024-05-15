import Blog from "../../models/Blog.js";
import { uploadImage } from "../../models/uploadImages.js";

const newBlogInstance = async (imageUrl) => {
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
    // const imageUrl = await uploadImage("../server/images/aldebaran-s-uXchDIKs4qI-unsplash.jpg");
    
    
    // get image object from uploaded image to cloudinary
    const image = req.file;
    
    // create a new blog from instance
    // const blog = await newBlogInstance();


    // TODO: extract all data needed from frontend
// ...


    // create a new blog from data sent from frontend
    const blog = new Blog({
      title: req.blogTitle,
      shortform: '' ,
      content: '' ,

      //...
      imageURL: image.url
    })

    // await blog.save();
    
    const output = await Blog.create(blog);

    res.status(200).json({ message: "Successfully added blog", output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createBlog;
