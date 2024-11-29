const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.get("/", newsController.getAllNews);

router.post("/", newsController.addNews);

router.post("/check", newsController.checkNewsForHoax);

router.delete("/:id", newsController.deleteNews);

module.exports = router;
