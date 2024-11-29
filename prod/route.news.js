// newsRoutes.js
const express = require("express");
const { getAllNews, checkNewsForHoax } = require("./controller.news");

const router = express.Router();

router.get("/", getAllNews);
router.post("/predict", checkNewsForHoax);

module.exports = router;
