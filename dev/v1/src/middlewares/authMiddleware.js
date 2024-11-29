const { expressjwt: jwt } = require("express-jwt");

// Middleware untuk verifikasi token JWT
const authenticateToken = jwt({
  secret: process.env.JWT_SECRET || "secretKey",
  algorithms: ["HS256"],
  credentialsRequired: true, // Membutuhkan token dalam header Authorization
});

module.exports = authenticateToken;
