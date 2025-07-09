import React, { useState } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import '../styles/AdminPages.css';

const CATEGORIAS_DEMO = [
  { id: 1, nombre: 'Limpieza' },
  { id: 2, nombre: 'Papelería' },
  { id: 3, nombre: 'Electrónica' }
];

const SERVICIOS_DEMO = [
  { id: 1, categoriaId: 1, titulo: 'Desinfección', subtitulo: 'Espacios seguros', texto: 'Desinfectamos oficinas y casas.', imagen: null },
  { id: 2, categoriaId: 1, titulo: 'Limpieza profunda', subtitulo: 'Brillo total', texto: 'Limpieza para negocios y hogares.', imagen: null },
  { id: 3, categoriaId: 2, titulo: 'Hojas tamaño carta', subtitulo: 'Alta calidad', texto: 'Venta de hojas sueltas.', imagen: null },
  { id: 4, categoriaId: 3, titulo: 'Soporte computacional', subtitulo: 'Rápido y confiable', texto: 'Soluciones para tu PC.', imagen: null }
];

export default function ServiciosAdmin() {
  const [categorias] = useState(CATEGORIAS_DEMO);
  const [servicios, setServicios] = useState(SERVICIOS_DEMO);
  const [catSel, setCatSel] = useState(categorias[0].id);

  const [form, setForm] = useState({
    id: null,
    titulo: '',
    subtitulo: '',
    texto: '',
    imagen: null,
    imagenPreview: null
  });

  const handleRowClick = (serv) => {
    setForm({
      id: serv.id,
      titulo: serv.titulo,
      subtitulo: serv.subtitulo,
      texto: serv.texto,
      imagen: serv.imagen,
      imagenPreview: serv.imagen
    });
  };

  const handleCatChange = (e) => {
    setCatSel(Number(e.target.value));
    setForm({
      id: null,
      titulo: '',
      subtitulo: '',
      texto: '',
      imagen: null,
      imagenPreview: null
    });
  };

  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = function(ev) {
        setForm(f => ({ ...f, imagen: file, imagenPreview: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ---- VALIDACIÓN de campos obligatorios ----
  const camposObligatoriosLlenos =
    form.titulo.trim() &&
    form.texto.trim() &&
    form.imagenPreview; // imagenPreview sólo existe si se selecciona imagen

  // --- GUARDAR ---
  const handleGuardar = () => {
    if (!form.titulo.trim() || !form.texto.trim() || !form.imagenPreview) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (form.id) {
      setServicios(s =>
        s.map(serv =>
          serv.id === form.id ? { ...serv, ...form } : serv
        )
      );
    } else {
      setServicios(s => [
        ...s,
        {
          ...form,
          id: s.length + 1,
          categoriaId: catSel
        }
      ]);
    }
    limpiarForm();
  };

  const limpiarForm = () =>
    setForm({ id: null, titulo: '', subtitulo: '', texto: '', imagen: null, imagenPreview: null });

  const handleDesactivar = () =>
    alert('Funcionalidad de desactivar aún no implementada.');

  const serviciosFiltrados = servicios.filter(s => s.categoriaId === catSel);

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de servicios</h1>
        </div>
        <div className="servadmin-card">
          {/* IZQUIERDA: Categoría y Tabla */}
          <div className="servadmin-table-section">
            <div className="servadmin-catselect">
              <label htmlFor="cat-select" className="catadmin-label">Categoría:</label>
              <select
                id="cat-select"
                className="catadmin-input"
                style={{ maxWidth: 220, marginBottom: 15 }}
                value={catSel}
                onChange={handleCatChange}
              >
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <h2 className="catadmin-section-title" style={{marginTop:8}}>Servicios</h2>
            <div className="catadmin-table-responsive">
              <table className="catadmin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {serviciosFiltrados.map(serv => (
                    <tr
                      key={serv.id}
                      onClick={() => handleRowClick(serv)}
                      style={{ cursor: "pointer" }}
                      className={form.id === serv.id ? "catadmin-row-selected" : ""}
                    >
                      <td>{serv.id}</td>
                      <td>{serv.titulo}</td>
                    </tr>
                  ))}
                  {serviciosFiltrados.length === 0 &&
                    <tr><td colSpan={2} style={{textAlign:'center',color:'#bbb'}}>No hay servicios</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
          {/* DERECHA: Formulario */}
          <div className="servadmin-form-section">
            <h2 className="catadmin-section-title">
              {form.id ? 'Editar servicio' : 'Nuevo servicio'}
            </h2>
            <form
              className="catadmin-form"
              onSubmit={e => { e.preventDefault(); handleGuardar(); }}
              autoComplete="off"
            >
              <label className="catadmin-label" htmlFor="serv-titulo">
                Título <span style={{ color: '#d8000c' }}>*</span>
              </label>
              <input
                id="serv-titulo"
                name="titulo"
                className="catadmin-input"
                value={form.titulo}
                onChange={handleInput}
                placeholder="Título del servicio"
                required
              />

              <label className="catadmin-label" htmlFor="serv-subtitulo">
                Subtítulo
              </label>
              <input
                id="serv-subtitulo"
                name="subtitulo"
                className="catadmin-input"
                value={form.subtitulo}
                onChange={handleInput}
                placeholder="Subtítulo del servicio"
                // No required aquí
              />

              <label className="catadmin-label" htmlFor="serv-texto">
                Texto <span style={{ color: '#d8000c' }}>*</span>
              </label>
              <textarea
                id="serv-texto"
                name="texto"
                className="catadmin-input"
                style={{minHeight: 60, resize: 'vertical'}}
                value={form.texto}
                onChange={handleInput}
                placeholder="Descripción del servicio"
                required
              />

              {/* Card de imagen */}
              <div className="servadmin-img-card">
                <label className="catadmin-label" style={{marginBottom:4}}>
                  Imagen <span style={{ color: '#d8000c' }}>*</span>
                </label>
                <div className="servadmin-img-upload-box">
                  {form.imagenPreview ? (
                    <img src={form.imagenPreview} alt="preview" className="servadmin-img-preview" />
                  ) : (
                    <span className="servadmin-img-placeholder">Selecciona una imagen</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="servadmin-img-input"
                    onChange={handleImage}
                    required={!form.imagenPreview}
                  />
                </div>
              </div>
              {/* Botones */}
              <div className="catadmin-btn-group">
                <button
                  type="submit"
                  className="catadmin-btn save"
                  disabled={!camposObligatoriosLlenos}
                  title={!camposObligatoriosLlenos ? "Completa los campos obligatorios" : ""}
                >
                  Guardar
                </button>
                <button type="button" className="catadmin-btn cancel" onClick={limpiarForm}>Cancelar</button>
                <button type="button" className="catadmin-btn danger" onClick={handleDesactivar}>Desactivar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
