import jwt from 'jsonwebtoken';
import blacklistService from '../services/blacklistTokenService.js';

const SECRET_KEY = 'capstone';

export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak tersedia." });
  }

  // Cek apakah token ada di blacklist
  const isBlacklisted = await blacklistService.isTokenBlacklisted(token);
    
  if (isBlacklisted) {
    return res.status(403).json({ message: "Token telah diblacklist dan tidak dapat digunakan." });
  }

  try {

    // Verifikasi token JWT
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid.' });
        }
              
        console.log(user);// Tambahkan informasi user ke request

        req.user = user;

        next();
    });
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa." });
  }
};