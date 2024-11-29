const express = require("express");
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

// Route yang dilindungi (hanya bisa diakses jika token valid)
router.get("/profile", authenticateToken, (req, res) => {
  // Data user diambil dari payload JWT
  res.json({ message: "Profile pengguna", user: req.user });
});

module.exports = router;
