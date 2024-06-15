import express from 'express';
const router = express.Router()
import { authToken } from '../middleware/authMiddleware.js'
import { getUserById, loginUser, registerUser } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authToken, getUserById);

export default router;