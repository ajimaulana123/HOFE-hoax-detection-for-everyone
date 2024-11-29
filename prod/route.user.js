// newsRoutes.js
const express = require("express");
const { authenticateToken } = require('./middleware.auth');
const User = require('./model.User');

const router = express.Router();

// Endpoint untuk melihat profil pengguna
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Ambil ID pengguna dari token yang sudah terverifikasi
    const userId = req.user.id;

    // Cari pengguna berdasarkan ID
    const user = await User.findById(userId).select('-password'); // Hapus field password dari respons

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Kirimkan data profil pengguna
    res.status(200).json({
      username: user.username,
      email: user.email,
      // Tambahkan field lain yang ingin ditampilkan
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
});

module.exports = router;
