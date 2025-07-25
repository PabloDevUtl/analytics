// backend/src/routes/userRoutes.js
import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getUsers,
  getMe,
  createUser,
  updateUsername,
  updatePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Todas las rutas a partir de aquí requieren token válido
router.use(protect);

// GET /api/users            → lista todos (sólo admins)
router.get("/", getUsers);

// GET /api/users/me         → tus datos (sin contraseña ni token)
router.get("/me", getMe);

// POST /api/users           → crea nuevo usuario
router.post(
  "/",
  [
    body("nombreUsuario")
      .trim()
      .isAlphanumeric()
      .withMessage("Usuario debe ser alfanumérico")
      .isLength({ min: 3, max: 30 })
      .withMessage("Usuario 3–30 caracteres")
      .escape(),
    body("contrasena")
      .trim()
      .isLength({ min: 6, max: 128 })
      .withMessage("Contraseña 6–128 caracteres"),
  ],
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ message: errs.array()[0].msg });
    }
    next();
  },
  createUser
);

// PATCH /api/users/me/username  → cambia sólo el nombre de usuario
router.patch(
  "/me/username",
  [
    body("nombreUsuario")
      .trim()
      .isAlphanumeric()
      .withMessage("Usuario debe ser alfanumérico")
      .isLength({ min: 8, max: 30 })
      .withMessage("Usuario debe tener entre 8 y 30 caracteres")
      .escape(),
  ],
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ message: errs.array()[0].msg });
    }
    next();
  },
  updateUsername
);

// PATCH /api/users/me/password  → cambia sólo la contraseña
router.patch(
  "/me/password",
  [
    body("currentPassword")
      .exists()
      .withMessage("Debes proporcionar la contraseña actual"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
  ],
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ message: errs.array()[0].msg });
    }
    next();
  },
  updatePassword
);

export default router;
