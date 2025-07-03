// src/components/SidebarAdmin.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/SidebarAdmin.css';

export default function SidebarAdmin() {
  // colapsa automáticamente en pantallas <768px
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* toggle siempre fijo */}
      <button
        className={`toggle-btn ${collapsed ? 'collapsed' : ''}`}
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="menu">
          <NavLink to="/home-admin" className="menu-item">
            Inicio
          </NavLink>
          <NavLink to="/servicios-admin" className="menu-item">
            Servicios
          </NavLink>
          <NavLink to="/categorias-admin" className="menu-item">
            Categorías
          </NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Salir
        </button>
      </nav>
    </>
  );
}
