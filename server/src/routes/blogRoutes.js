import { Router } from "express";
import {
  getBlogs,
  createBlog,
  getBlogbyId,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsControllers.js";

const blogRouter = Router();

blogRouter.route("/").get(getBlogs).post(createBlog);
blogRouter.route("/:id").get(getBlogbyId).put(updateBlog).delete(deleteBlog);

export default blogRouter;
