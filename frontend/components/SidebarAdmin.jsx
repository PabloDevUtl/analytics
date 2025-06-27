// src/components/SidebarAdmin.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/SidebarAdmin.css';

export default function SidebarAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <button
        className={`toggle-btn ${collapsed ? 'collapsed' : ''}`}
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="menu">
          <h2 className="title">Admin</h2>
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
