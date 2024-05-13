import { Router } from "express";
import {
  getOrganizations,
  createOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganizations,
} from "../controllers/organizationsController.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";

const organizationsRouter = Router();

organizationsRouter.route("/").get(getOrganizations).post(jwtAuthAdmin,createOrganizations);
organizationsRouter.route("/:id").get(getOrganizationById).put(jwtAuthAdmin, updateOrganization).delete(jwtAuthAdmin, deleteOrganizations);

export default organizationsRouter;
