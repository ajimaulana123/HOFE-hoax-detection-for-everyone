import authService from "./../services/authService.js";
import blacklistService from "../services/blacklistTokenService.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const user = await authService.registerUser(username, email, password);

    res.status(201).json({ message: "Registrasi berhasil", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Di sini, hanya validasi jika ada header Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    // Verifikasi apakah token sudah diblacklist
    const isBlacklisted = await blacklistService.isTokenBlacklisted(token);

    if (isBlacklisted) {
      return res.status(200).json({ message: "Token sudah di blacklist" });
    }

    // Menambahkan token ke blacklist
    await blacklistService.blacklistToken(token);

    res.status(200).json({
      message: "Logout berhasil, token diblacklist.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

export default { register, login, logout };
