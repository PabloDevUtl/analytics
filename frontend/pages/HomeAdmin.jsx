// src/pages/HomeAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import AlertaSesion from '../components/AlertaSesion';
import '../styles/AdminPages.css';

export default function HomeAdmin() {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  // Chequeo inicial de expiración del JWT en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSessionExpired(true);
      return;
    }
    try {
      // Decodificamos el payload y comprobamos el exp
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        setSessionExpired(true);
      }
    } catch (err) {
      setSessionExpired(true);
    }
  }, []);

  // --- Si sesión expirada, solo alerta y no más UI ---
  if (sessionExpired) {
    return (
      <AlertaSesion
        show={true}
        title="Sesión expirada"
        message="Tu sesión ha expirado. Por favor, inicia sesión de nuevo."
        onConfirm={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      />
    );
  }

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Bienvenido(a) al Panel de Administración</h1>
          <p className="admin-desc">
            ¡Has iniciado sesión correctamente! Selecciona una opción para comenzar a gestionar tu sitio.
          </p>
        </div>
        <div className="admin-home-cards">
          <div
            className="admin-home-card"
            onClick={() => navigate('/servicios-admin')}
            tabIndex={0}
            role="button"
            aria-label="Gestionar Servicios"
          >
            <div className="admin-home-card-icon">
              <i className="bi bi-wrench-adjustable"></i>
            </div>
            <div>
              <h2 className="admin-home-card-title">Gestionar Servicios</h2>
              <p className="admin-home-card-desc">
                Administra los servicios disponibles, edita, agrega o elimina fácilmente.
              </p>
            </div>
          </div>
          <div
            className="admin-home-card"
            onClick={() => navigate('/categorias-admin')}
            tabIndex={0}
            role="button"
            aria-label="Gestionar Categorías"
          >
            <div className="admin-home-card-icon">
              <i className="bi bi-tags"></i>
            </div>
            <div>
              <h2 className="admin-home-card-title">Gestionar Categorías</h2>
              <p className="admin-home-card-desc">
                Crea y organiza categorías para tus servicios de forma sencilla.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
