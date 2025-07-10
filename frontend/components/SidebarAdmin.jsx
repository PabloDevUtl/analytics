// src/components/SidebarAdmin.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/SidebarAdmin.css';

export default function SidebarAdmin() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Detectar cambio de tamaño
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // En móvil devolvemos sólo la nav inferior
  if (isMobile) {
    return (
      <nav className="mobile-nav">
        <NavLink to="/home-admin" className="mobile-nav-item">Inicio</NavLink>
        <NavLink to="/servicios-admin" className="mobile-nav-item">Servicios</NavLink>
        <NavLink to="/categorias-admin" className="mobile-nav-item">Categorías</NavLink>
       <button onClick={handleLogout} className="mobile-nav-item mobile-nav-logout">Salir</button>
      </nav>
    );
  }

  // En escritorio seguimos mostrando el sidebar original
  return (
    <>
      <button
        className={`toggle-btn ${collapsed ? 'collapsed' : ''}`}
        onClick={() => setCollapsed(c => !c)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="menu">
          <NavLink to="/home-admin" className="menu-item">Inicio</NavLink>
          <NavLink to="/servicios-admin" className="menu-item">Servicios</NavLink>
          <NavLink to="/categorias-admin" className="menu-item">Categorías</NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </nav>
    </>
  );
}
