// backend/src/controllers/authController.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel.js';
// Helper para firmar el token JWT
const signToken = (userId, username, rol) => {
  return jwt.sign(
    { id: userId, nombreUsuario: username, rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;
  try {
    const user = await Usuario.findOne({ nombreUsuario });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.comparePassword(contrasena);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = signToken(user._id, user.nombreUsuario, user.rol);
    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
// POST /api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id);
    user.token = '';
    await user.save();
    res.json({ message: 'Desconectado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};