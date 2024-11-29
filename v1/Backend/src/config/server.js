const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  app.use(helmet());

  const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  app.use(cors(corsOptions));

  // Rate limiting for security
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
};
