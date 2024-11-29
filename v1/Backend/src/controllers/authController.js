const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "secretKey"; // Ganti dengan key yang aman di production

/**
 * @description Mendaftarkan pengguna baru
 */
const register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Cek apakah username sudah ada
    const existingUser = await db
      .selectFrom("users")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    const newUser = await db
      .insertInto("users")
      .values({ username, password: hashedPassword })
      .returningAll()
      .executeTakeFirstOrThrow();

    res
      .status(201)
      .json({
        message: "Registrasi berhasil",
        user: { id: newUser.id, username: newUser.username },
      });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Login pengguna
 */
const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Cari pengguna berdasarkan username
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();

    if (!user) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Logout pengguna (dikelola di sisi klien)
 */
const logout = (req, res) => {
  res.json({ message: "Logout berhasil" });
};

module.exports = {
  register,
  login,
  logout,
};
