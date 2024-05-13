import { Router } from "express";
import { createDeliveryOrder } from "../controllers/deliveryControllers.js";

const deliveryRouter = Router();

deliveryRouter.route("/create").post(createDeliveryOrder);

export default deliveryRouter;
