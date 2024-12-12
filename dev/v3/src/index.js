import http from "http";
import app from "./app.js";
import { PORT } from "./config/environment.js";

const startServer = () => {
  const server = http.createServer(app());

  server.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });

  server.on("error", (error) => {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1); // Exit process on error
  });
};

startServer();
