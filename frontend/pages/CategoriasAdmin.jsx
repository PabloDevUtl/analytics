import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import Alerta2 from '../components/Alerta2';
import AlertaSesion from '../components/AlertaSesion';
import AlertAuto from '../components/AlertAuto';

import '../styles/AdminPages.css';
import {
  getCategorias,
  crearCategoria,
  editarCategoria,
  cambiarEstatusCategoria,
  eliminarCategoria
} from '../JavaScript/cargarCategoria';

export default function CategoriasAdmin() {
  // controla si la sesión expiró
  const [sessionExpired, setSessionExpired] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(1);

  // Imagen: se guarda en base64 para preview y para la API
  const [imagenBase64, setImagenBase64] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  // Alert auto
  const [alertAuto, setAlertAuto] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // NUEVO: loading
  const [loading, setLoading] = useState(true);

  // --- Chequeo de token expirada al montar ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSessionExpired(true);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        setSessionExpired(true);
      }
    } catch {
      setSessionExpired(true);
    }
  }, []);

  // --- Carga de categorías y manejo de expiración en API ---
  const cargarCategorias = async () => {
    setLoading(true); // <<<<<<<<<<<<<<<<<<<<<<
    try {
      const cats = await getCategorias();
      setCategorias(cats);
    } catch (err) {
      if (
        err.message.toLowerCase().includes('401') ||
        err.message.toLowerCase().includes('no autorizado') ||
        err.message.toLowerCase().includes('sesion') ||
        err.message.toLowerCase().includes('expirad')
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: 'error' });
      }
    }
    setLoading(false); // <<<<<<<<<<<<<<<<<<<<<<
  };

  useEffect(() => {
    if (!sessionExpired) cargarCategorias();
    // eslint-disable-next-line
  }, [sessionExpired]);

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

  // --- Handlers normales ---
  const handleGuardar = async () => {
    if (nuevoNombre.trim() === '') return;
    if (!imagenPreview) {
      setAlertAuto({ show: true, message: 'La imagen es obligatoria.', type: 'error' });
      return;
    }
    try {
      if (selectedId) {
        await editarCategoria(selectedId, nuevoNombre, imagenPreview);
        setAlertAuto({ show: true, message: '¡Categoría editada correctamente!', type: 'success' });
      } else {
        await crearCategoria(nuevoNombre, imagenPreview);
        setAlertAuto({ show: true, message: '¡Categoría creada exitosamente!', type: 'success' });
      }
      limpiarForm();
      await cargarCategorias();
    } catch (err) {
      if (
        err.message.toLowerCase().includes('401') ||
        err.message.toLowerCase().includes('no autorizado') ||
        err.message.toLowerCase().includes('sesion') ||
        err.message.toLowerCase().includes('expirad')
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: 'error' });
      }
    }
  };

  const limpiarForm = () => {
    setNuevoNombre('');
    setSelectedId(null);
    setSelectedStatus(1);
    setImagenBase64('');
    setImagenPreview('');
  };

  const handleImagen = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = ev => {
        setImagenBase64(ev.target.result);
        setImagenPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRowClick = (cat) => {
    setNuevoNombre(cat.nombreCategoria);
    setSelectedId(cat.idCategoria);
    setSelectedStatus(cat.estatus);
    setImagenBase64(cat.imagen || '');
    setImagenPreview(cat.imagen || '');
  };

  const handleCancelar = limpiarForm;

  const handleDesactivar = async () => {
    if (!selectedId) return;
    try {
      await cambiarEstatusCategoria(selectedId, selectedStatus === 1 ? 0 : 1);
      limpiarForm();
      await cargarCategorias();
      setAlertAuto({
        show: true,
        message: selectedStatus === 1
          ? '¡Categoría desactivada con éxito!'
          : '¡Categoría activada con éxito!',
        type: 'success'
      });
    } catch (err) {
      if (
        err.message.toLowerCase().includes('401') ||
        err.message.toLowerCase().includes('no autorizado') ||
        err.message.toLowerCase().includes('sesion') ||
        err.message.toLowerCase().includes('expirad')
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: 'error' });
      }
    }
  };

  const handleEliminar = () => setAlertOpen(true);

  const confirmarEliminar = async () => {
    try {
      await eliminarCategoria(selectedId);
      limpiarForm();
      setAlertOpen(false);
      await cargarCategorias();
      setAlertAuto({ show: true, message: '¡Categoría eliminada con éxito!', type: 'success' });
    } catch (err) {
      if (
        err.message.toLowerCase().includes('401') ||
        err.message.toLowerCase().includes('no autorizado') ||
        err.message.toLowerCase().includes('sesion') ||
        err.message.toLowerCase().includes('expirad')
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: 'error' });
      }
    }
  };

  const cancelarEliminar = () => setAlertOpen(false);

  return (
    <div className="admin-container">
      <AlertAuto
        show={alertAuto.show}
        message={alertAuto.message}
        type={alertAuto.type}
        onClose={() => setAlertAuto(a => ({ ...a, show: false }))}
      />
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de categorías</h1>
          <p className="admin-desc">Administra las categorías de tu sistema.</p>
        </div>
        <div className="catadmin-card">
          {/* Tabla de categorías */}
          <div className="catadmin-table-section">
            <h2 className="catadmin-section-title">Listado de categorías</h2>
            <div className="catadmin-table-responsive">
              <table className="catadmin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#ef8802', fontWeight: 600 }}>
                        Cargando...
                      </td>
                    </tr>
                  ) : categorias.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#bbb' }}>Sin categorías</td>
                    </tr>
                  ) : (
                    categorias.map((cat) => (
                      <tr
                        key={cat.idCategoria}
                        className={selectedId === cat.idCategoria ? "catadmin-row-selected" : ""}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(cat)}
                      >
                        <td>{cat.idCategoria}</td>
                        <td>
                          {cat.imagen
                            ? <img src={cat.imagen} alt="img" style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: 7, border: '1px solid #ef8802', background: '#fff' }} />
                            : <span style={{ color: '#bbb', fontSize: 14 }}>Sin imagen</span>
                          }
                        </td>
                        <td>{cat.nombreCategoria}</td>
                        <td>
                          <span style={{ color: cat.estatus === 1 ? '#44a40e' : '#cc0a00', fontWeight: 600 }}>
                            {cat.estatus === 1 ? 'Activa' : 'Desactivada'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Formulario de categoría */}
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
              {/* Imagen de la categoría */}
              <div className="catadmin-img-card" style={{ marginBottom: 8 }}>
                <label className="catadmin-label" style={{ marginBottom: 4 }}>
                  Imagen <span style={{ color: '#d8000c' }}>*</span>
                </label>
                <div className="servadmin-img-upload-box">
                  {imagenPreview
                    ? <img src={imagenPreview} alt="preview" className="servadmin-img-preview" />
                    : <span className="servadmin-img-placeholder">Selecciona una imagen</span>
                  }
                  <input
                    type="file"
                    accept="image/*"
                    className="servadmin-img-input"
                    onChange={handleImagen}
                    required={!imagenPreview}
                  />
                </div>
              </div>

              {/* Estatus y botones */}
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
