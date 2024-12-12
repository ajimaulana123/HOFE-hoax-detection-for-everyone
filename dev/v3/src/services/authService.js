import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

const SECRET_KEY = "capstone";

const isString = (value) => typeof value === 'string';

const isValidLength = (value, minLength) => value.length > minLength;

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

// Register user
const registerUser = async (username, email, password) => {
  if (!isString(username)) throw new Error("Username harus berupa string");
  if (!isString(email)) throw new Error("Email harus berupa string");

  if (!isValidLength(username, 3)) throw new Error("Username harus lebih dari 3 karakter");
  if (!isValidLength(email, 3)) throw new Error("Email harus lebih dari 3 karakter");
  if (!isValidLength(password, 8)) throw new Error("Password harus lebih dari 8 karakter");
 
  if (!isValidEmail(email)) throw new Error("Email harus menggunakan domain @gmail.com");

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) throw new Error("Email sudah digunakan");

  const id = nanoid(); // Default panjang 21 karakter

  const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah tingkat salt rounds

  const newUser = await userRepository.createUser({ id, username, email, password: hashedPassword });

  return newUser;
};

const comparePassword = async (inputPassword, userPassword) => await bcrypt.compare(inputPassword, userPassword);

// Login user
const loginUser = async (email, password) => {
  if (!isString(email)) throw new Error("Email harus berupa string");

  if (!isValidLength(email, 3)) throw new Error("Email harus lebih dari 3 karakter");
  if (!isValidLength(password, 8)) throw new Error("Password harus lebih dari 8 karakter");

  if (!isValidEmail(email)) throw new Error("Email harus menggunakan domain @gmail.com");

  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Email atau password salah");
  }

  console.log(user.id)

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "7d" }
  );

  return { user, token };
};

export default { registerUser, loginUser };