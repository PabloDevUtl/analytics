import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import '../styles/AdminPages.css';

export default function ServiciosAdmin() {
  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <h1>Servicios</h1>
        <p>Gestión de servicios.</p>
      </main>
    </div>
  );
}
