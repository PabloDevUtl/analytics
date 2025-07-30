// backend/src/controllers/userController.js
import User from '../models/userModel.js';

// Listar todos los usuarios (sólo SuperAdmin)
export const getUsers = async (req, res) => {
  try {
    const users = await User
      .find()
      .select('-contrasena -token -__v');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Obtener mis datos
export const getMe = async (req, res) => {
  try {
    const me = await User
      .findById(req.user.id)
      .select('-contrasena -token -__v');
    if (!me) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(me);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear nuevo usuario (SuperAdmin)
export const createUser = async (req, res) => {
  try {
    const { nombreUsuario, contrasena, rol } = req.body;

   // 1) Calcula el próximo idUsuario
   const last = await User.findOne().sort({ idUsuario: -1 }).lean();
   const nextId = last ? last.idUsuario + 1 : 1;

    // 2) Crea el usuario con ese idUsuario
   const newUser = new User({
     idUsuario: nextId,
     nombreUsuario,
     contrasena,
     rol
   });

    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Actualizar usuario cualquiera (SuperAdmin)
export const updateUser = async (req, res) => {
  try {
    const { nombreUsuario, rol, contrasena } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (nombreUsuario) user.nombreUsuario = nombreUsuario;
    if (rol) user.rol = rol;
    if (contrasena) user.contrasena = contrasena;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Eliminar usuario (SuperAdmin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * PATCH /api/users/me/username
 * Actualiza únicamente el nombre de usuario.
 */
export const updateUsername = async (req, res) => {
  try {
    const { nombreUsuario } = req.body;
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    // 1) Si no cambia, respondemos con 400
    if (user.nombreUsuario === nombreUsuario) {
      return res
        .status(400)
        .json({ message: 'El nuevo nombre coincide con el actual' });
    }

   // 2) Verificar que no exista otro usuario con ese nombre
   const exists = await User.findOne({ nombreUsuario });
  if (exists && exists._id.toString() !== user._id.toString()) {
     return res
       .status(400)
       .json({ message: 'Ya existe un usuario con ese nombre' });
   }

    // 3) Asignar y guardar
    user.nombreUsuario = nombreUsuario;
    await user.save();
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PATCH /api/users/me/password
 * Actualiza únicamente la contraseña, tras verificar la actual.
 */

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) 
      return res.status(404).json({ message: 'Usuario no encontrado' });

    // 1) Verificar la contraseña actual
    const match = await user.comparePassword(currentPassword);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // 2) Validar que la nueva no sea igual a la actual
    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: 'La nueva contraseña no puede ser igual a la actual' });
    }

    // 3) Asignar y guardar
    user.contrasena = newPassword; // el pre('save') la hasheará
    await user.save();
    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
