// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../JavaScript/login.js';
import '../styles/Login2.css'; // tu estilo

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // esto guarda el token en localStorage
      await doLogin(usuario.trim(), contrasena);
      // si no hubo excepción, rediriges al panel
      navigate('/home-admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Bienvenido administrador</h2>

        <label>Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>

        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}
