// backend/src/routes/categoriaRoutes.js
import express from 'express';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  setEstatusCategoria,
  eliminarCategoria
} from '../controllers/categoriaController.js';

const router = express.Router();

// Todas las rutas empiezan con /api/categorias
router.get('/', getCategorias);
router.post('/', createCategoria);
router.put('/:idCategoria', updateCategoria);
router.patch('/:idCategoria/estatus', setEstatusCategoria);
router.delete('/:id', eliminarCategoria);

export default router;
