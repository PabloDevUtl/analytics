// backend/src/controllers/categoriaController.js
import Categoria from '../models/categoriaModel.js';

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const cats = await Categoria.find().sort({ idCategoria: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear nueva categoría
export const createCategoria = async (req, res) => {
  try {
    // Asigna el siguiente idCategoria
    const lastCat = await Categoria.findOne().sort({ idCategoria: -1 });
    const nextId = lastCat ? lastCat.idCategoria + 1 : 1;

    const nueva = new Categoria({
      idCategoria: nextId,
      nombreCategoria: req.body.nombreCategoria,
      estatus: 1
    });
    const saved = await nueva.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar categoría
export const updateCategoria = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const updated = await Categoria.findOneAndUpdate(
      { idCategoria: Number(idCategoria) },
      { nombreCategoria: req.body.nombreCategoria },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cambiar estatus (activar/desactivar)
export const setEstatusCategoria = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const { estatus } = req.body; // 1 = activar, 0 = desactivar
    const updated = await Categoria.findOneAndUpdate(
      { idCategoria: Number(idCategoria) },
      { estatus: Number(estatus) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Metodo para eliminar categoria
export const eliminarCategoria = async (req, res) => {
  try {
    const cat = await Categoria.findOneAndDelete({ idCategoria: req.params.id });
    if (!cat) return res.status(404).json({ message: 'No encontrada' });
    // Aquí podrías agregar lógica para eliminar servicios relacionados si deseas
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
