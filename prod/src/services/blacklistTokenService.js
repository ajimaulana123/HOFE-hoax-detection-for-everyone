import blacklistRepository from '../repositories/blacklistTokenRepository.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'capstone';

// Menyimpan token ke blacklist
const blacklistToken = async (token) => {
  const decoded = jwt.verify(token, SECRET_KEY);

  await blacklistRepository.saveToken(token, new Date(decoded.exp * 1000));
};

// Memeriksa apakah token ada di blacklist
const isTokenBlacklisted = async (token) => {
  const blacklistedToken = await blacklistRepository.findBlacklistedToken(token);

  return blacklistedToken !== null;
};

export default { blacklistToken, isTokenBlacklisted };
