const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const newsRoutes = require("./route.news"); // kasih file
const authRoutes = require("./route.auth"); // kasih file
const userRoutes = require("./route.user"); // kasih file
const connectDB = require('./db'); // kasih file

const app = express();

connectDB();

// Setup untuk middlewares dan routes
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Menangani kesalahan umum
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
