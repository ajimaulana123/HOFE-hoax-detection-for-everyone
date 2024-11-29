import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const SECRET_KEY = 'capstone';

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
});

// Login endpoint
router.get('/logout', authenticateToken, (req, res) => {
    res.status(200).send('Successfully logged out');
});

export default router;
