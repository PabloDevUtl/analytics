import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';           // <-- importa useNavigate
import fondoLogin from '../assets/fondoLogin.png';
import '../styles/Login.css';
import { doLogin } from '../JavaScript/login';

export default function Login() {
  const [usuario,     setUsuario]   = useState('');
  const [contrasena,  setContrasena] = useState('');
  const [error,       setError]     = useState('');
  const navigate = useNavigate();                             // <-- hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const u = await doLogin(usuario, contrasena);
      localStorage.setItem('token', u.token);
      navigate('/home-admin');                                // <-- navega aquí
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div
      className="login-page d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="login-card p-4 p-md-5">
        <h2 className="text-center mb-4 login-title">
          Bienvenido administrador
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Usuario"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
            />
            <label htmlFor="usuario">Usuario</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              required
            />
            <label htmlFor="contrasena">Contraseña</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Iniciar sesión
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
