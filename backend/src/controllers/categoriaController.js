// backend/src/controllers/categoriaController.js
import Categoria from '../models/categoriaModel.js';
import Servicio from '../models/servicioModel.js';

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
    const lastCat = await Categoria.findOne().sort({ idCategoria: -1 });
    const nextId = lastCat ? lastCat.idCategoria + 1 : 1;
    const nueva = new Categoria({
      idCategoria: nextId,
      nombreCategoria: req.body.nombreCategoria,
      imagen: req.body.imagen || "", // Guardar la imagen base64
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
    const updateFields = {
      nombreCategoria: req.body.nombreCategoria,
    };
    // Solo actualiza la imagen si viene
    if ('imagen' in req.body) {
      updateFields.imagen = req.body.imagen;
    }
    const updated = await Categoria.findOneAndUpdate(
      { idCategoria: Number(idCategoria) },
      updateFields,
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

// Metodo para eliminar categoria y sus servicios relacionados
export const eliminarCategoria = async (req, res) => {
  try {
    const idCat = Number(req.params.id);
    
    // Elimina la categoría
    const cat = await Categoria.findOneAndDelete({ idCategoria: idCat });
    if (!cat) return res.status(404).json({ message: 'Categoría no encontrada' });

    // Elimina los servicios relacionados a esa categoría
    const deletedServices = await Servicio.deleteMany({ idCategoria: idCat });

    res.json({
      message: `Categoría eliminada correctamente. Se eliminaron ${deletedServices.deletedCount} servicios relacionados.`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
