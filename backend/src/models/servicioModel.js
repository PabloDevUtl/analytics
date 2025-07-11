// backend/src/models/servicioModel.js
import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
  idServicio:   { type: Number, required: true, unique: true },
  idCategoria:  { type: Number, required: true },
  titulo:       { type: String, required: true },
  subtitulo:    { type: String, default: "" },
  texto:        { type: String, required: true },
  imagen:       { type: String, default: "" },
  estatus:      { type: Number, default: 1 } // 1: activo, 0: desactivado
}, { collection: 'servicio', timestamps: true });

export default mongoose.model('Servicio', servicioSchema);
