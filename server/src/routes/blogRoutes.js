import { Router } from "express";
import { getBlogs } from "../controllers/blogsControllers.js";

const blogRouter = Router();

blogRouter.route("/").get(getBlogs);

export default blogRouter;