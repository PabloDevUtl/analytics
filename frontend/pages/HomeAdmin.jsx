import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import '../styles/AdminPages.css';

export default function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Bienvenido(a) al Panel de Administración</h1>
          <p className="admin-desc">¡Has iniciado sesión correctamente! Selecciona una opción para comenzar a gestionar tu sitio.</p>
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
