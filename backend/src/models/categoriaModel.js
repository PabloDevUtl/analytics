// backend/src/models/categoriaModel.js
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  idCategoria: { type: Number, required: true, unique: true },
  nombreCategoria: { type: String, required: true },
  estatus: { type: Number, default: 1 } // 1 = Activo, 0 = Inactivo
}, { collection: 'categoria', timestamps: true });

export default mongoose.model('Categoria', categoriaSchema);
