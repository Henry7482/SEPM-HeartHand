import { Router } from "express";
import {
  getGeneratedBlogs,
  uploadGeneratedBlogs,
  deleteGeneratedBlogs
} from "../controllers/blogsControllers.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";

const generatedBlogsRouter = Router();
generatedBlogsRouter
  .route("/")
  .get(jwtAuthAdmin, getGeneratedBlogs)
  .post(uploadGeneratedBlogs);

generatedBlogsRouter.route("/:id").delete(jwtAuthAdmin, deleteGeneratedBlogs);

export default generatedBlogsRouter;
