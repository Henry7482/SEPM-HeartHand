import { Router } from "express";
import { getScraperData, getLatestScraperData, createScraperData } from "../controllers/scraperControllers.js";

const scraperRouter = Router();

scraperRouter.route("/").get(getScraperData).post(createScraperData);
scraperRouter.route("/latest").get(getLatestScraperData);

export default scraperRouter;