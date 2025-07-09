import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import Alerta2 from '../components/Alerta2';
import '../styles/AdminPages.css';

import {
  getCategorias,
  crearCategoria,
  editarCategoria,
  cambiarEstatusCategoria,
  eliminarCategoria // NUEVO: importa esta función de tu API
} from '../JavaScript/cargarCategoria';

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);

  const cargarCategorias = async () => {
    try {
      const cats = await getCategorias();
      setCategorias(cats);
    } catch (err) {
      alert('Error al cargar categorías');
    }
  };

  useEffect(() => { cargarCategorias(); }, []);

  const handleGuardar = async () => {
    if (nuevoNombre.trim() === '') return;
    try {
      if (selectedId) {
        await editarCategoria(selectedId, nuevoNombre);
      } else {
        await crearCategoria(nuevoNombre);
      }
      setNuevoNombre('');
      setSelectedId(null);
      setSelectedStatus(1);
      await cargarCategorias();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelar = () => {
    setNuevoNombre('');
    setSelectedId(null);
    setSelectedStatus(1);
  };

  // Desactivar o activar
  const handleDesactivar = async () => {
    if (!selectedId) return;
    try {
      await cambiarEstatusCategoria(selectedId, selectedStatus === 1 ? 0 : 1);
      setNuevoNombre('');
      setSelectedId(null);
      setSelectedStatus(1);
      await cargarCategorias();
    } catch (err) {
      alert(err.message);
    }
  };

  // Para mostrar el modal de confirmación
  const handleEliminar = () => setAlertOpen(true);

  // Confirmar y eliminar de BD (y recargar)
  const confirmarEliminar = async () => {
    try {
      await eliminarCategoria(selectedId);
      setNuevoNombre('');
      setSelectedId(null);
      setSelectedStatus(1);
      setAlertOpen(false);
      await cargarCategorias();
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelarEliminar = () => setAlertOpen(false);

  // Al seleccionar fila
  const handleRowClick = (cat) => {
    setNuevoNombre(cat.nombreCategoria);
    setSelectedId(cat.idCategoria);
    setSelectedStatus(cat.estatus);
  };

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de categorías</h1>
          <p className="admin-desc">Administra las categorías de tu sistema.</p>
        </div>
        <div className="catadmin-card">
          <div className="catadmin-table-section">
            <h2 className="catadmin-section-title">Listado de categorías</h2>
            <div className="catadmin-table-responsive">
              <table className="catadmin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((cat) => (
                    <tr
                      key={cat.idCategoria}
                      className={selectedId === cat.idCategoria ? "catadmin-row-selected" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(cat)}
                    >
                      <td>{cat.idCategoria}</td>
                      <td>{cat.nombreCategoria}</td>
                      <td>
                        <span style={{ color: cat.estatus === 1 ? '#44a40e' : '#cc0a00', fontWeight: 600 }}>
                          {cat.estatus === 1 ? 'Activa' : 'Desactivada'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {categorias.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', color: '#bbb' }}>Sin categorías</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="catadmin-form-section">
            <h2 className="catadmin-section-title">
              {selectedId ? 'Editar categoría' : 'Nueva categoría'}
            </h2>
            <form className="catadmin-form" onSubmit={e => { e.preventDefault(); handleGuardar(); }}>
              <label htmlFor="nombre-categoria" className="catadmin-label">Nombre</label>
              <input
                id="nombre-categoria"
                type="text"
                className="catadmin-input"
                placeholder="Ejemplo: Electrónica"
                value={nuevoNombre}
                onChange={e => setNuevoNombre(e.target.value)}
                autoComplete="off"
                required
              />
              {selectedId && (
                <div style={{ marginBottom: '0.8rem', fontSize: 14 }}>
                  <strong>Estatus:</strong>{' '}
                  <span style={{ color: selectedStatus === 1 ? '#44a40e' : '#cc0a00', fontWeight: 600 }}>
                    {selectedStatus === 1 ? 'Activa' : 'Desactivada'}
                  </span>
                </div>
              )}
              <div className="catadmin-btn-group">
                <button type="submit" className="catadmin-btn save">Guardar</button>
                <button type="button" className="catadmin-btn cancel" onClick={handleCancelar}>Cancelar</button>
                {selectedId &&
                  <>
                    <button
                      type="button"
                      className="catadmin-btn danger"
                      onClick={handleDesactivar}
                    >
                      {selectedStatus === 1 ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      type="button"
                      className="catadmin-btn danger"
                      style={{ background: "#e22323", color: "#fff" }}
                      onClick={handleEliminar}
                    >
                      Eliminar
                    </button>
                  </>
                }
              </div>
            </form>
          </div>
        </div>
        {/* Modal de confirmación */}
        <Alerta2
          show={alertOpen}
          title="¿Eliminar categoría?"
          message="¿Estás seguro de que deseas eliminar esta categoría? Si tiene servicios relacionados también desaparecerán."
          onConfirm={confirmarEliminar}
          onCancel={cancelarEliminar}
        />
      </main>
    </div>
  );
}
