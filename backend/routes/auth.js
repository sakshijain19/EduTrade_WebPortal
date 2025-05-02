import express from 'express';
import * as authController from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register route - POST /api/auth/register
router.post('/register', authController.register);

// Login route - POST /api/auth/login
router.post('/login', authController.login);

// Verify token route - GET /api/auth/verify
router.get('/verify', auth, authController.verify);

// Get profile route - GET /api/auth/profile
router.get('/profile', auth, authController.getProfile);

// Update profile route - PUT /api/auth/profile
router.put('/profile', auth, authController.updateProfile);

export default router;