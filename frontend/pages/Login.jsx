// src/components/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/fondoLogin.png';
import '../styles/Login.css';
import { doLogin } from '../JavaScript/login';

// Nuevos tiempos de bloqueo en segundos:
// 1m, 3m, 15m, 30m, 1h, 2h
const LOCK_DURATIONS = [60, 180, 900, 1800, 3600, 7200];
const RESET_IDLE = 20 * 60; // 20m

const STORAGE_KEY = 'loginLockData';

function readLockData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeLockData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [lockedUntil, setLockedUntil] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef();

  // Al montar, chequea estado de bloqueo
  useEffect(() => {
    const data = readLockData();
    const now = Date.now();

    // Si han pasado >20m desde el último intento, reset completo
    if (data.lastAttempt && now - data.lastAttempt > RESET_IDLE * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    if (data.lockUntil && data.lockUntil > now) {
      setLockedUntil(data.lockUntil);
      setRemaining(Math.ceil((data.lockUntil - now) / 1000));
    }
  }, []);

  // Cuenta regresiva
  useEffect(() => {
    if (!lockedUntil) return;
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const sec = Math.ceil((lockedUntil - now) / 1000);
      if (sec <= 0) {
        clearInterval(timerRef.current);
        setLockedUntil(null);
        setRemaining(0);
      } else {
        setRemaining(sec);
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [lockedUntil]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const now = Date.now();
    let data = readLockData();

    // Si está bloqueado, no hace nada
    if (data.lockUntil && data.lockUntil > now) return;

    try {
      const u = await doLogin(usuario, contrasena);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem('token', u.token);
      navigate('/home-admin');
    } catch (err) {
      // Registro de fallo
      data.lastAttempt = now;
      data.failedCount = (data.failedCount || 0) + 1;

      // Si alcanza 3 fallos, aplicamos bloqueo
      if (data.failedCount >= 3) {
        const level = data.lockLevel || 0;
        const duration = LOCK_DURATIONS[
          Math.min(level, LOCK_DURATIONS.length - 1)
        ];
        data.lockUntil = now + duration * 1000;
        data.lockLevel = level + 1;
        data.failedCount = 0;
        setLockedUntil(data.lockUntil);
        setRemaining(duration);
      }

      writeLockData(data);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  // Formatea mm:ss
  const format = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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
              onChange={(e) => setUsuario(e.target.value)}
              disabled={!!lockedUntil}
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
              onChange={(e) => setContrasena(e.target.value)}
              disabled={!!lockedUntil}
              required
            />
            <label htmlFor="contrasena">Contraseña</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={!!lockedUntil}
          >
            Iniciar sesión
          </button>

          {lockedUntil && (
            <div className="alert alert-warning mt-3" role="alert">
              Demasiados intentos. Vuelve a intentarlo en {format(remaining)}.
            </div>
          )}

          {error && !lockedUntil && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
