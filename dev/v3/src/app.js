import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { marked } from "marked"; // Menggunakan marked untuk konversi markdown ke HTML
import newsRoutes from "./routes/newsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./database/firestoreDb.js";

let appInstance = null;

const createApp = () => {
  if (appInstance) {
    console.log("✔ Express app instance already created");
    return appInstance;
  }

  const app = express();

  // Inisialisasi koneksi database
  connectDB();

  // Setup middlewares
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  // Setup routes
  app.get("/", (req, res) => {
    const readmePath = path.resolve("README.md");

    // Membaca file README.md
    fs.readFile(readmePath, "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading README.md" });
      }

      // Mengonversi konten Markdown ke HTML (optional)
      const htmlContent = marked(data);

      // Mengirimkan HTML ke client
      res.send(htmlContent);
    });
  });

  app.use("/api/news", newsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);

  // Menangani kesalahan umum
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
  });

  appInstance = app; // Simpan instance agar bisa digunakan ulang
  console.log("✔ Express app instance created");
  return app;
};

export default createApp;
