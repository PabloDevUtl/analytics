// backend/src/routes/servicioRoutes.js
import express from 'express';
import {
  getServicios,
  crearServicio,
  editarServicio,
  setEstatusServicio,
  eliminarServicio
} from '../controllers/servicioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET público (para mostrar servicios)
router.get('/', getServicios);

// CRUD protegido (solo admin)
router.post('/', protect, crearServicio);
router.put('/:idServicio', protect, editarServicio);
router.patch('/:idServicio/estatus', protect, setEstatusServicio);
router.delete('/:id', protect, eliminarServicio);

export default router;
