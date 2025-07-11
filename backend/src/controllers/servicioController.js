// backend/src/controllers/servicioController.js
import Servicio from '../models/servicioModel.js';

// GET servicios por categoría (opcionalmente activos)
export const getServicios = async (req, res) => {
  try {
    const { idCategoria, estatus } = req.query;
    const filtro = {};
    if (idCategoria) filtro.idCategoria = Number(idCategoria);
    if (estatus !== undefined) filtro.estatus = Number(estatus);
    const servicios = await Servicio.find(filtro).sort({ idServicio: 1 });
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: crear servicio
export const crearServicio = async (req, res) => {
  try {
    // Autoincrementa idServicio
    const last = await Servicio.findOne().sort({ idServicio: -1 });
    const nextId = last ? last.idServicio + 1 : 1;
    const nuevo = new Servicio({
      idServicio: nextId,
      idCategoria: req.body.idCategoria,
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo || "",
      texto: req.body.texto,
      imagen: req.body.imagen || "",
      estatus: 1
    });
    const saved = await nuevo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT: editar servicio
export const editarServicio = async (req, res) => {
  try {
    const { idServicio } = req.params;
    const updateFields = {
      idCategoria: req.body.idCategoria,
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo || "",
      texto: req.body.texto
    };
    if ('imagen' in req.body) updateFields.imagen = req.body.imagen;
    const updated = await Servicio.findOneAndUpdate(
      { idServicio: Number(idServicio) },
      updateFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH: activar/desactivar
export const setEstatusServicio = async (req, res) => {
  try {
    const { idServicio } = req.params;
    const { estatus } = req.body;
    const updated = await Servicio.findOneAndUpdate(
      { idServicio: Number(idServicio) },
      { estatus: Number(estatus) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE: eliminar servicio
export const eliminarServicio = async (req, res) => {
  try {
    const deleted = await Servicio.findOneAndDelete({ idServicio: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
