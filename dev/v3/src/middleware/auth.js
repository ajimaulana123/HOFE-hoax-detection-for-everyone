import jwt from 'jsonwebtoken';
import blacklistService from '../services/blacklistTokenService.js';

const SECRET_KEY = 'capstone';

export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak tersedia." });
  }

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Cek apakah token ada di blacklist
    const isBlacklisted = await blacklistService.isTokenBlacklisted(token);
    
    if (isBlacklisted) {
      return res.status(403).json({ message: "Token telah diblacklist dan tidak dapat digunakan." });
    }

    req.user = decoded;  // Menyimpan informasi user di request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa." });
  }
};
