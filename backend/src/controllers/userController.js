// backend/src/controllers/userController.js
import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User
      .find()
      .select('-contrasena -token -__v'); // excluye campos sensibles
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

    // Si no cambia, respondemos con 400
    if (user.nombreUsuario === nombreUsuario) {
      return res
        .status(400)
        .json({ message: 'El nuevo nombre coincide con el actual' });
    }

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