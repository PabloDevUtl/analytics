import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  idUsuario: {
    type: Number,
    required: true,
    unique: true
  },
  nombreUsuario: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
   rol: {
    type: Number,
    required: true,
    enum: [1, 2],
    default: 2 // 1 = SuperAdmin, 2 = Admin
  },
  token: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Antes de guardar: hashea la contraseña si cambió
userSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.contrasena);
};

// Nótese el tercer parámetro: la colección real en Atlas es "usuario"
export default mongoose.model('Usuario', userSchema, 'usuario');