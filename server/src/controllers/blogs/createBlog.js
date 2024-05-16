import Blog from "../../models/Blog.js";
import { uploadImageToCloudinary } from "../../services/uploadImages.js";

const createBlog = async (req, res) => {

  try {
    const file = req.file;
    if (!file) {
      console.log('No file uploaded.');
      req.body.imageURL = '';
    }

    const imageUrl = await uploadImageToCloudinary(file.buffer);
    // console.log('Image URL:', imageUrl);
    req.body.imageURL = imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    req.body.imageURL = '';
  }


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
