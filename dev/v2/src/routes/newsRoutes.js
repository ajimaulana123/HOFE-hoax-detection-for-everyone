// newsRoutes.js
import express from "express";
import { getAllNews, checkNewsForHoax } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.post("/predict", checkNewsForHoax);

export default router;
