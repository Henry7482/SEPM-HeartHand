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

const blogRouter = Router();

blogRouter.route("/").get(getBlogs).post(createBlog);
blogRouter.route("/:id").get(getBlogbyId).put(updateBlog).delete(deleteBlog);
blogRouter.route("/generatedblogs").get(getGeneratedBlogs).get(getGeneratedBlogsById).post(uploadGeneratedBlogs);

export default blogRouter;
