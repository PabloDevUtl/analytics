import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// login no necesita token
router.post('/login', loginUser);

// logout requiere estar logueado
router.post('/logout', protect, logoutUser);

export default router;
