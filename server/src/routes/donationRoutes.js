import { Router } from "express";
import { getDonations, getDonationByUserId } from "../controllers/donationControllers.js";
import { jwtAuthDonor } from "../middlewares/cookiejwtAuth.js";

const donationRouter = Router();

donationRouter.use(jwtAuthDonor);

donationRouter.route("/").get(getDonations);
donationRouter.route("/:id").get(getDonationByUserId);

export default donationRouter;
