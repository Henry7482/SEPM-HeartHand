import { Router } from "express";
import {
  getGeneratedBlogs,
  uploadGeneratedBlogs,
} from "../controllers/blogsControllers.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";

const generatedBlogsRouter = Router();
generatedBlogsRouter
  .route("/")
  .get(jwtAuthAdmin, getGeneratedBlogs)
  .post(uploadGeneratedBlogs);

export default generatedBlogsRouter;
