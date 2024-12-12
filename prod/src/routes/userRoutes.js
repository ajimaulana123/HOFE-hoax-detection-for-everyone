// newsRoutes.js
import express from "express";
import { authenticateToken } from '../middleware/auth.js';
// repository/userRepository.js
import { db } from "./../database/firestoreDb.js";

const router = express.Router();

// Endpoint untuk melihat profil pengguna
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userRef = db.collection("users").doc(userId);
    
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Ambil data pengguna dan hapus password sebelum mengirim respons
    const user = userDoc.data();

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


export default router;