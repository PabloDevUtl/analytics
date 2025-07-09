// backend/src/models/categoriaModel.js
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  idCategoria: { type: Number, required: true, unique: true },
  nombreCategoria: { type: String, required: true },
  imagen: { type: String, default: "" }, // Nueva línea para imagen
  estatus: { type: Number, default: 1 }
}, { collection: 'categoria', timestamps: true });


export default mongoose.model('Categoria', categoriaSchema);
