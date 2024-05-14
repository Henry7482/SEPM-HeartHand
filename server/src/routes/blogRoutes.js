import { Router } from "express";
import {
  getBlogs,
  createBlog,
  getBlogbyId,
  updateBlog,
  deleteBlog,
  getGeneratedBlogs,
  uploadGeneratedBlogs,
} from "../controllers/blogsControllers.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";

const blogRouter = Router();

blogRouter.route("/").get(getBlogs).post(jwtAuthAdmin, createBlog);
blogRouter
  .route("/:id")
  .get(getBlogbyId)
  .put(jwtAuthAdmin, updateBlog)
  .delete(jwtAuthAdmin, deleteBlog);
blogRouter
  .route("/generatedblogs")
  .get(jwtAuthAdmin, getGeneratedBlogs)
  .post(uploadGeneratedBlogs);

export default blogRouter;
