// repository/userRepository.js
import { db } from "./../database/firestoreDb.js";

// Menyimpan token yang diblacklist ke Firestore
const saveToken = async (token, expiredAt) => {
  const blacklistTokenRef = db.collection('blacklistTokens').doc(token);

  await blacklistTokenRef.set({
    token,
    expiredAt
  });

  console.log(`Token ${token} telah disimpan di Firestore.`);
};

// Mencari token di Firestore
const findBlacklistedToken = async (token) => {
  const blacklistTokenRef = db.collection('blacklistTokens').doc(token);
  
  const doc = await blacklistTokenRef.get();

  if (!doc.exists) {
    console.log('Token tidak ditemukan di blacklist.');
    return null;
  }

  console.log('Token ditemukan di blacklist.');

  return doc.data();
};

export default { saveToken, findBlacklistedToken };
