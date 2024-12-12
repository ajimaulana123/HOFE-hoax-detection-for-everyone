// repository/userRepository.js
import { db } from "./../database/firestoreDb.js";

const findUserByEmail = async (email) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();
  if (snapshot.empty) {
    return null;
  }
  const user = snapshot.docs[0];
  return user.data();
};

const createUser = async ({ id, username, email, password }) => {
  const userRef = db.collection("users").doc(id);

  await userRef.set({
    id, // Simpan ID di dalam dokumen jika diperlukan
    username,
    email,
    password, // Pastikan password sudah di-hash sebelum disimpan
  });
};

export default { findUserByEmail, createUser };
