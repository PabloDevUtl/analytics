import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import '../styles/AdminPages.css';

export default function CategoriasAdmin() {
  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <h1>Categorías</h1>
        <p>Gestión de categorías.</p>
      </main>
    </div>
  );
}
