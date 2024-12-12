import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin"

// Mengganti __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menggunakan path absolut
const serviceAccountPath = path.resolve(__dirname, "../config/<credential_firestore>.json");

let db = null; // Variabel untuk menyimpan instance Firestore
let isConnected = false; // Variabel untuk melacak status koneksi

const connectDB = async () => {
  if (isConnected) {
    console.log("✔ Firestore is already connected");
    return;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccountPath
      ),
      projectId: "api-cc-hofe-321",
    });

    db = admin.firestore();

    isConnected = true;

    console.log("✔ Firestore connected successfully");
  
    return db;
  } catch (error) {
    console.error("✘ Firestore connection error:", error.message);
    process.exit(1); // Berhenti jika gagal koneksi
  }
};

export { db, connectDB };
