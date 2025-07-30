// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token faltante' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findById(decoded.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = { id: user._id, nombreUsuario: user.nombreUsuario, rol: user.rol };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Para rutas accesibles sólo a SuperAdmins (rol = 1)
export const requireSuperAdmin = (req, res, next) => {
  if (req.user.rol !== 1) {
    return res.status(403).json({ message: 'Acceso denegado: se requiere SuperAdmin' });
  }
  next();
};
