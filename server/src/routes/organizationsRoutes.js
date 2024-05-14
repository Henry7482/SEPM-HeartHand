import { Router } from "express";
import {
  getOrganizations,
  createOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganizations,
} from "../controllers/organizationsController.js";
import { upload } from './uploadImages.js';  // Assuming middleware is correctly set up
const organizationsRouter = Router();

organizationsRouter.route("/").get(getOrganizations).post(upload.single('logo'), createOrganizations);
organizationsRouter.route("/:id").get(getOrganizationById).put(upload.single('logo'), updateOrganization).delete(deleteOrganizations);

export default organizationsRouter;
