import { Router } from "express";
import {
  login,
  signup,
  getDonors,
  getDonorbyId,
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.route("/").get(getDonors);
userRouter.route("/:id").get(getDonorbyId);
userRouter.route("/login").post(login);
userRouter.route("/signup").post(signup);

export default userRouter;
