import { Router } from "express";
import { getScraperData, getLatestScraperData, createScraperData } from "../controllers/scraperControllers.js";
import { jwtAuthAdmin } from "../middlewares/cookiejwtAuth.js";

const scraperRouter = Router();

scraperRouter.route("/").get(jwtAuthAdmin ,getScraperData).post(createScraperData);
scraperRouter.route("/latest").get(jwtAuthAdmin, getLatestScraperData);

export default scraperRouter;