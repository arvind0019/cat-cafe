import express from 'express';
import { forgotPassword, login, me, register, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, me);
router.put('/me', protect, updateProfile);

export default router;
