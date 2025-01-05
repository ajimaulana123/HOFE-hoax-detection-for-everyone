import mongoose from "mongoose";

let isConnected = false; // Variabel untuk melacak status koneksi

const connectDB = async () => {
  const dbURI = "<our-db>"; // Ganti sesuai URI MongoDB

  if (isConnected) {
    console.log("✔ MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(dbURI);

    isConnected = true;

    console.log("✔ MongoDB connected successfully");
  } catch (error) {
    console.error("✘ MongoDB connection error:", error.message);
    process.exit(1); // Berhenti jika gagal koneksi
  }
};

export default connectDB;
