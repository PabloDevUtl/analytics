// backend/src/routes/userRoutes.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
  getUsers,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  updateUsername,
  updatePassword,
} from '../controllers/userController.js';
import { protect, requireSuperAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Rutas de mi cuenta (cualquier admin)
router.get('/me', protect, getMe);
router.patch(
  '/me/username',
  protect,
  body('nombreUsuario')
    .trim()
    .isAlphanumeric().withMessage('Usuario debe ser alfanumérico')
    .isLength({ min: 8, max: 30 }).withMessage('8–30 caracteres')
    .escape(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ message: errs.array()[0].msg });
    next();
  },
  updateUsername
);
router.patch(
  '/me/password',
  protect,
  body('currentPassword').exists().withMessage('Proporciona la contraseña actual'),
  body('newPassword').isLength({ min: 8 }).withMessage('Mínimo 8 caracteres'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ message: errs.array()[0].msg });
    next();
  },
  updatePassword
);

// Rutas de SuperAdmin
router.use(protect, requireSuperAdmin);

router.get('/', getUsers);
router.post(
  '/',
  body('nombreUsuario')
    .trim().isAlphanumeric().withMessage('Alfanumérico')
    .isLength({ min: 3, max: 30 }).withMessage('3–30 caracteres'),
  body('contrasena')
    .trim().isLength({ min: 6, max: 128 }).withMessage('6–128 caracteres'),
  body('rol').isIn([1, 2]).withMessage('Rol inválido'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ message: errs.array()[0].msg });
    next();
  },
  createUser
);
router.patch(
  '/:id',
  body('nombreUsuario').optional().trim().isAlphanumeric(),
  body('rol').optional().isIn([1, 2]),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ message: errs.array()[0].msg });
    next();
  },
  updateUser
);
router.delete('/:id', deleteUser);

export default router;
