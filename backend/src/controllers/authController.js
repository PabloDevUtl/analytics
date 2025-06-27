// backend/src/controllers/authController.js

import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel.js';

// Helper para firmar el token JWT
const signToken = (userId, username) => {
  return jwt.sign(
    { id: userId, nombreUsuario: username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  // 1) Logueamos lo que llega en el cuerpo de la petición
 console.log('📝 /api/auth/login req.body →', req.body);
  const { nombreUsuario, contrasena } = req.body;
  try {
    // 2) Buscamos el usuario por nombreUsuario
    const user = await Usuario.findOne({ nombreUsuario });
    if (!user) {
      console.log('❌ Usuario no encontrado:', nombreUsuario);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // 3) Comparamos la contraseña con el hash en la BD
    const isMatch = await user.comparePassword(contrasena);
    if (!isMatch) {
      console.log('❌ Contraseña incorrecta para:', nombreUsuario);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 4) Firmamos y guardamos el token
    const token = signToken(user._id, user.nombreUsuario);
    user.token = token;
    await user.save();

    console.log('✅ Login exitoso, token generado para:', nombreUsuario);
    return res.json({ token });

  } catch (err) {
    // 5) En caso de error inesperado, volcamos stack para depurar
    console.error('‼️ Error en loginUser:', err);
    return res
      .status(500)
      .json({ message: err.message, stack: err.stack });
  }
};

// POST /api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    console.log('🔒 Logout attempt para:', req.user.nombreUsuario);
    const user = await Usuario.findById(req.user.id);
    user.token = '';
    await user.save();
    console.log('✅ Logout exitoso para:', req.user.nombreUsuario);
    res.json({ message: 'Desconectado correctamente' });
  } catch (err) {
    console.error('‼️ Error en logoutUser:', err);
    res.status(500).json({ message: 'Error al cerrar sesión', stack: err.stack });
  }
};
