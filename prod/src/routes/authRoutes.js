import express from 'express';
import jwt from 'jsonwebtoken';
import authController from './../controllers/authController.js'

const router = express.Router();
const SECRET_KEY = 'capstone';

// Register endpoint
router.post('/register', authController.register);
// Login endpoint
router.post('/login', authController.login);
// Login endpoint
router.get('/logout', authController.logout);

export default router;
