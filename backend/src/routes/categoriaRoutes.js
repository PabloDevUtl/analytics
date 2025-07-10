import express from 'express';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  setEstatusCategoria,
  eliminarCategoria
} from '../controllers/categoriaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// -- GET público --
router.get('/', getCategorias);

// -- Los siguientes SÍ requieren autenticación --
router.post('/', protect, createCategoria);
router.put('/:idCategoria', protect, updateCategoria);
router.patch('/:idCategoria/estatus', protect, setEstatusCategoria);
router.delete('/:id', protect, eliminarCategoria);

export default router;
