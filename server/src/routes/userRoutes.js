import { Router } from "express";
import {
  signup,
  getDonors,
  getDonorbyId,
} from "../controllers/userControllers.js";

import { login,
  newRefreshToken,
  newAccessToken,
  logout, } from "../services/authenticate.js";
import { jwtAuthAdmin, jwtAuthDonor } from "../middlewares/cookiejwtAuth.js";

const userRouter = Router();


userRouter.route("/").get(jwtAuthAdmin, getDonors);
userRouter.route("/:id").get(jwtAuthDonor, getDonorbyId);
userRouter.route("/login").post(login);
userRouter.route("/logout").delete(logout);
userRouter.route("/signup").post(signup);
userRouter.route("/token/refresh").post(newRefreshToken);
userRouter.route("/token/access").get(newAccessToken);

export default userRouter;
