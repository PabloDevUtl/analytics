import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import '../styles/AdminPages.css';

export default function HomeAdmin() {
  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <h1>Panel de Administración</h1>
        <p>¡Has iniciado sesión correctamente!</p>
      </main>
    </div>
  );
}
