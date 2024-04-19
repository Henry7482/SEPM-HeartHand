import { Router } from "express";
import {
  getOrganizations,
  createOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganizations,
} from "../controllers/organizationsController.js";

const organizationsRouter = Router();

organizationsRouter.route("/").get(getOrganizations).post(createOrganizations);
organizationsRouter.route("/:id").get(getOrganizationById).put(updateOrganization).delete(deleteOrganizations);

export default organizationsRouter;
