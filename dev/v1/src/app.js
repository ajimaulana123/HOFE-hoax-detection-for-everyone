const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const configureServer = require("./config/server");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
configureServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
