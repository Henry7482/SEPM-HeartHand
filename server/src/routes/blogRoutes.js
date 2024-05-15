import { Router } from "express";
import {
  getBlogs,
  createBlog,
  getBlogbyId,
  updateBlog,
  deleteBlog,
  getGeneratedBlogs,
  uploadGeneratedBlogs,
  getGeneratedBlogsById,
} from "../controllers/blogsControllers.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";
// import { upload } from "../models/uploadImages.js";
import uploadImageToCloudinary from '../configs/cloudinary.js';

const blogRouter = Router();

// GET '/api/v1/blogs/'
// POST '/api/v1/blogs/'
blogRouter.route("/").get(getBlogs).post(
  // jwtAuthAdmin, 

  // uploadImageToCloudinary.single('blogImage'), 

  (req, res, next) => {
    console.log('POST creating blog endpoint');
    console.log('> req object: ', req);
    res.send('hi')
  }, 
  
  createBlog
);
blogRouter
  .route("/:id")
  .get(getBlogbyId)
  .put(jwtAuthAdmin, updateBlog)
  .delete(jwtAuthAdmin, deleteBlog);
blogRouter
  .route("/generatedblogs")
  .get(jwtAuthAdmin, getGeneratedBlogs, getGeneratedBlogsById)
  .post(uploadGeneratedBlogs);

export default blogRouter;
