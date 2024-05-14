import { Router } from "express";
import { createDeliveryOrder, cancelDeliveryOrder } from "../controllers/deliveryControllers.js";
import { jwtAuthDonor } from "../middlewares/cookiejwtAuth.js";

const deliveryRouter = Router();

deliveryRouter.use(jwtAuthDonor);

deliveryRouter.route("/create").post(createDeliveryOrder);
deliveryRouter.route("/cancel").delete(cancelDeliveryOrder);

export default deliveryRouter;
