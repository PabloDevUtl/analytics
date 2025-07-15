import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Alerta2 from "../components/Alerta2";
import AlertaSesion from "../components/AlertaSesion";
import AlertAuto from "../components/AlertAuto";

import "../styles/AdminPages.css";
import { getCategorias } from "../JavaScript/cargarCategoria";
import {
  getServicios,
  crearServicio,
  editarServicio,
  cambiarEstatusServicio,
  eliminarServicio,
} from "../JavaScript/cargarServicio";

export default function ServiciosAdmin() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [catSel, setCatSel] = useState("");
  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertAuto, setAlertAuto] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [loadingImg, setLoadingImg] = useState(false);
  const fileInputRef = React.useRef(null);

  const [form, setForm] = useState({
    idServicio: null,
    idCategoria: "",
    titulo: "",
    subtitulo: "",
    texto: "",
    imagenPreview: "",
    estatus: 1,
  });

  // --- Chequeo de expiración de sesión ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSessionExpired(true);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        setSessionExpired(true);
      }
    } catch {
      setSessionExpired(true);
    }
  }, []);

  // --- Cargar categorías ---
  useEffect(() => {
    setLoading(true);
    getCategorias()
      .then((cats) => {
        const activas = cats.filter((c) => c.estatus === 1);
        setCategorias(activas);
        setCatSel(activas[0]?.idCategoria || "");
        setForm((f) => ({
          ...f,
          idCategoria: activas[0]?.idCategoria || "",
        }));
      })
      .catch(() => setSessionExpired(true))
      .finally(() => setLoading(false));
  }, []);

  // --- Cargar servicios por categoría ---
  useEffect(() => {
    if (catSel) {
      setLoading(true);
      getServicios(catSel)
        .then((servs) => setServicios(servs))
        .catch(() => setSessionExpired(true))
        .finally(() => setLoading(false));
    } else {
      setServicios([]);
    }
  }, [catSel]);

  // --- Si la sesión expiró, mostrar alerta ---
  if (sessionExpired) {
    return (
      <AlertaSesion
        show={true}
        title="Sesión expirada"
        message="Tu sesión ha expirado. Por favor, inicia sesión de nuevo."
        onConfirm={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />
    );
  }

  // --- Handlers ---
  const limpiarForm = (categoriaIdDefault = catSel) =>
    setForm({
      idServicio: null,
      idCategoria: categoriaIdDefault || categorias[0]?.idCategoria || "",
      titulo: "",
      subtitulo: "",
      texto: "",
      imagenPreview: "",
      estatus: 1,
    });

  const handleRowClick = (serv) => {
    setForm({
      idServicio: serv.idServicio,
      idCategoria: serv.idCategoria,
      titulo: serv.titulo,
      subtitulo: serv.subtitulo,
      texto: serv.texto,
      imagenPreview: serv.imagen,
      estatus: serv.estatus,
    });
  };

  const handleCatChange = (e) => {
    const selected = Number(e.target.value);
    setCatSel(selected);
    limpiarForm(selected);
  };

  const handleFormCatChange = (e) => {
    setForm((f) => ({ ...f, idCategoria: Number(e.target.value) }));
  };

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingImg(true);

      // Valida tipo
      if (!file.type.startsWith("image/")) {
        setAlertAuto({
          show: true,
          message: "El archivo seleccionado no es una imagen.",
          type: "error",
        });
        setLoadingImg(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Valida tamaño máximo
      const MAX_MB = 1; // 1MB
      if (file.size > MAX_MB * 1024 * 1024) {
        setAlertAuto({
          show: true,
          message: "La imagen no debe pesar más de 1MB.",
          type: "error",
        });
        setLoadingImg(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Forza repintado antes de procesar
      setTimeout(() => {
        const img = new window.Image();
        const reader = new window.FileReader();
        reader.onload = function (ev) {
          img.onload = function () {
            // Redimensiona
            const canvas = document.createElement("canvas");
            const maxW = 600; // Ajusta si lo deseas
            const scale = Math.min(1, maxW / img.width);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Calidad 0.7
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
            setForm((f) => ({ ...f, imagenPreview: dataUrl }));
            setLoadingImg(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
          };
          img.onerror = () => {
            setAlertAuto({
              show: true,
              message: "Error al cargar la imagen.",
              type: "error",
            });
            setLoadingImg(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
          };
          img.src = ev.target.result;
        };
        reader.onerror = () => {
          setAlertAuto({
            show: true,
            message: "No se pudo leer la imagen.",
            type: "error",
          });
          setLoadingImg(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.readAsDataURL(file);
      }, 0);
    }
  };

  const camposObligatoriosLlenos =
    form.idCategoria &&
    form.titulo.trim() &&
    form.texto.trim() &&
    form.imagenPreview;

  // --- Guardar (crear/editar) ---
  const handleGuardar = async () => {
    if (!camposObligatoriosLlenos) {
      setAlertAuto({
        show: true,
        message: "Completa todos los campos obligatorios.",
        type: "error",
      });
      return;
    }
    try {
      if (form.idServicio) {
        await editarServicio(form.idServicio, {
          idCategoria: form.idCategoria,
          titulo: form.titulo,
          subtitulo: form.subtitulo,
          texto: form.texto,
          imagen: form.imagenPreview,
        });
        setAlertAuto({
          show: true,
          message: "¡Servicio editado correctamente!",
          type: "success",
        });
      } else {
        await crearServicio({
          idCategoria: form.idCategoria,
          titulo: form.titulo,
          subtitulo: form.subtitulo,
          texto: form.texto,
          imagen: form.imagenPreview,
        });
        setAlertAuto({
          show: true,
          message: "¡Servicio creado exitosamente!",
          type: "success",
        });
      }
      limpiarForm();
      setServicios(await getServicios(catSel));
    } catch (err) {
      if (
        err.message.toLowerCase().includes("401") ||
        err.message.toLowerCase().includes("no autorizado") ||
        err.message.toLowerCase().includes("sesion") ||
        err.message.toLowerCase().includes("expirad")
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: "error" });
      }
    }
  };

  // --- Desactivar/activar ---
  const handleDesactivar = async () => {
    if (!form.idServicio) return;
    try {
      await cambiarEstatusServicio(form.idServicio, form.estatus === 1 ? 0 : 1);
      limpiarForm();
      setServicios(await getServicios(catSel));
      setAlertAuto({
        show: true,
        message:
          form.estatus === 1
            ? "¡Servicio desactivado con éxito!"
            : "¡Servicio activado con éxito!",
        type: "success",
      });
    } catch (err) {
      if (
        err.message.toLowerCase().includes("401") ||
        err.message.toLowerCase().includes("no autorizado") ||
        err.message.toLowerCase().includes("sesion") ||
        err.message.toLowerCase().includes("expirad")
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: "error" });
      }
    }
  };

  // --- Eliminar ---
  const handleEliminar = () => setAlertOpen(true);

  const confirmarEliminar = async () => {
    try {
      await eliminarServicio(form.idServicio);
      limpiarForm();
      setAlertOpen(false);
      setServicios(await getServicios(catSel));
      setAlertAuto({
        show: true,
        message: "¡Servicio eliminado con éxito!",
        type: "success",
      });
    } catch (err) {
      if (
        err.message.toLowerCase().includes("401") ||
        err.message.toLowerCase().includes("no autorizado") ||
        err.message.toLowerCase().includes("sesion") ||
        err.message.toLowerCase().includes("expirad")
      ) {
        setSessionExpired(true);
      } else {
        setAlertAuto({ show: true, message: err.message, type: "error" });
      }
    }
  };

  const cancelarEliminar = () => setAlertOpen(false);

  // --- Filtrar servicios por categoría seleccionada ---
  const serviciosFiltrados = servicios.filter((s) => s.idCategoria === catSel);

  return (
    <div className="admin-container">
      <AlertAuto
        show={alertAuto.show}
        message={alertAuto.message}
        type={alertAuto.type}
        onClose={() => setAlertAuto((a) => ({ ...a, show: false }))}
      />
      <SidebarAdmin />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de servicios</h1>
        </div>
        <div className="servadmin-card">
          {/* IZQUIERDA: Categoría y Tabla */}
          <div
            className="servadmin-table-section"
            style={{ flex: 2, minWidth: 400, maxWidth: 600 }}
          >
            <div className="servadmin-catselect">
              <label htmlFor="cat-select" className="catadmin-label">
                Categoría:
              </label>
              <select
                id="cat-select"
                className="catadmin-input"
                style={{ maxWidth: 290, marginBottom: 15 }}
                value={catSel || ""}
                onChange={handleCatChange}
                disabled={loading}
              >
                {loading && <option>Cargando...</option>}
                {!loading && categorias.length === 0 && (
                  <option value="">Sin categorías</option>
                )}
                {!loading &&
                  categorias.map((c) => (
                    <option key={c.idCategoria} value={c.idCategoria}>
                      {c.nombreCategoria}
                    </option>
                  ))}
              </select>
            </div>
            <h2 className="catadmin-section-title" style={{ marginTop: 8 }}>
              Servicios
            </h2>
            <div className="catadmin-table-responsive">
              <table className="catadmin-table" style={{ minWidth: 550 }}>
                <thead>
                  <tr>
                    <th style={{ width: 65 }}>#</th>
                    <th style={{ width: 170 }}>Título</th>
                    <th style={{ width: 95 }}>Imagen</th>
                    <th style={{ width: 90 }}>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "#ef8802",
                          fontWeight: 600,
                        }}
                      >
                        Cargando...
                      </td>
                    </tr>
                  ) : serviciosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        style={{ textAlign: "center", color: "#bbb" }}
                      >
                        No hay servicios
                      </td>
                    </tr>
                  ) : (
                    serviciosFiltrados.map((serv, idx) => (
                      <tr
                        key={serv.idServicio}
                        onClick={() => handleRowClick(serv)}
                        style={{ cursor: "pointer" }}
                        className={
                          form.idServicio === serv.idServicio
                            ? "catadmin-row-selected"
                            : ""
                        }
                      >
                        <td>{idx + 1}</td>
                        <td>{serv.titulo}</td>
                        <td>
                          {serv.imagen ? (
                            <img
                              src={serv.imagen}
                              alt="img"
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                borderRadius: 7,
                                border: "1.5px solid #ef8802",
                                background: "#fff",
                              }}
                            />
                          ) : (
                            <span style={{ color: "#bbb", fontSize: 14 }}>
                              Sin imagen
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            style={{
                              color: serv.estatus === 1 ? "#44a40e" : "#cc0a00",
                              fontWeight: 600,
                            }}
                          >
                            {serv.estatus === 1 ? "Activo" : "Desactivado"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* DERECHA: Formulario */}
          <div
            className="servadmin-form-section"
            style={{ flex: 1, maxWidth: 500 }}
          >
            <h2 className="catadmin-section-title">
              {form.idServicio ? "Editar servicio" : "Nuevo servicio"}
            </h2>
            <form
              className="catadmin-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleGuardar();
              }}
              autoComplete="off"
            >
              {/* SELECT de categoría en el formulario */}
              <div>
                <label htmlFor="form-categoria" className="catadmin-label">
                  Categoría <span style={{ color: "#d8000c" }}>*</span>
                </label>
                <select
                  id="form-categoria"
                  name="idCategoria"
                  className="catadmin-input"
                  value={form.idCategoria || ""}
                  onChange={handleFormCatChange}
                  required
                  disabled={loading}
                  style={{ marginBottom: 8 }} // elimina cualquier width o maxWidth aquí
                >
                  {loading && <option>Cargando...</option>}
                  {!loading && categorias.length === 0 && (
                    <option value="">Sin categorías</option>
                  )}
                  {!loading &&
                    categorias.map((c) => (
                      <option key={c.idCategoria} value={c.idCategoria}>
                        {c.nombreCategoria}
                      </option>
                    ))}
                </select>
              </div>

              <label className="catadmin-label" htmlFor="serv-titulo">
                Título <span style={{ color: "#d8000c" }}>*</span>
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
              />

              <label className="catadmin-label" htmlFor="serv-texto">
                Texto <span style={{ color: "#d8000c" }}>*</span>
              </label>
              <textarea
                id="serv-texto"
                name="texto"
                className="catadmin-input"
                style={{ minHeight: 180, resize: "vertical" }}
                value={form.texto}
                onChange={handleInput}
                placeholder="Descripción del servicio"
                required
              />

              {/* Card de imagen */}
              <div className="servadmin-img-card">
                <label className="catadmin-label" style={{ marginBottom: 4 }}>
                  Imagen <span style={{ color: "#d8000c" }}>*</span>
                </label>

                <div className="servadmin-img-upload-box">
                  {loadingImg ? (
                    <span className="servadmin-img-placeholder">
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: 22, color: "#ef8802" }}
                      ></i>
                      &nbsp;Procesando imagen...
                    </span>
                  ) : form.imagenPreview ? (
                    <img
                      src={form.imagenPreview}
                      alt="preview"
                      className="servadmin-img-preview"
                    />
                  ) : (
                    <span className="servadmin-img-placeholder">
                      Selecciona una imagen
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="servadmin-img-input"
                    onChange={handleImage}
                    required={!form.imagenPreview}
                    disabled={loadingImg}
                    ref={fileInputRef}
                  />
                </div>
              </div>
              {/* Estatus y botones */}
              {form.idServicio && (
                <div style={{ marginBottom: "0.8rem", fontSize: 14 }}>
                  <strong>Estatus:</strong>{" "}
                  <span
                    style={{
                      color: form.estatus === 1 ? "#44a40e" : "#cc0a00",
                      fontWeight: 600,
                    }}
                  >
                    {form.estatus === 1 ? "Activo" : "Desactivado"}
                  </span>
                </div>
              )}
              <div className="catadmin-btn-group">
                <button
                  type="submit"
                  className="catadmin-btn save"
                  disabled={!camposObligatoriosLlenos}
                  title={
                    !camposObligatoriosLlenos
                      ? "Completa los campos obligatorios"
                      : ""
                  }
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="catadmin-btn cancel"
                  onClick={() => limpiarForm(catSel)}
                >
                  Cancelar
                </button>
                {form.idServicio && (
                  <>
                    <button
                      type="button"
                      className="catadmin-btn danger"
                      onClick={handleDesactivar}
                    >
                      {form.estatus === 1 ? "Desactivar" : "Activar"}
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
                )}
              </div>
            </form>
          </div>
        </div>
        <Alerta2
          show={alertOpen}
          title="¿Eliminar servicio?"
          message="¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer."
          onConfirm={confirmarEliminar}
          onCancel={cancelarEliminar}
        />
      </main>
    </div>
  );
}
