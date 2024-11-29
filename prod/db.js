const mongoose = require('mongoose');

const connectDB = async () => {
  const DB_URI = '<out-uri-db>'; // Ganti sesuai URI MongoDB

  try {
    await mongoose.connect(DB_URI);
    console.log('✔ MongoDB connected successfully');
  } catch (error) {
    console.error('✘ MongoDB connection error:', error.message);
    process.exit(1); // Berhenti jika gagal koneksi
  }
};

module.exports = connectDB;
