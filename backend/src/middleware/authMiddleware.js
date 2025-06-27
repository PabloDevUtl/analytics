import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token = null;
  // lee Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token faltante' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // opcional: comprueba que el token guardado en la BD coincide
    const user = await Usuario.findById(decoded.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = { id: user._id, nombreUsuario: user.nombreUsuario };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
