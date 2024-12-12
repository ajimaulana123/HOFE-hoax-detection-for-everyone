// newsRoutes.js
import express from "express";
import {
  handleCheckNewsForHoaxByText,
  handleCheckNewsForHoaxByUrl,
  handleGetAllNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", handleGetAllNews);
router.post("/predict/text", handleCheckNewsForHoaxByText);
router.post("/predict/url", handleCheckNewsForHoaxByUrl);

export default router;
