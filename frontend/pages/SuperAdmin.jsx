// src/pages/SuperAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import Alerta from "../components/Alerta";
import Alerta2 from "../components/Alerta2";
import AlertaSesion from "../components/AlertaSesion";
import AlertAuto from "../components/AlertAuto";
import "../styles/AdminPages.css";

const PW_CRITERIA = [
  { id: "length", label: "8+ caracteres", test: (pw) => pw.length >= 8 },
  { id: "upper", label: "Una mayúscula", test: (pw) => /[A-Z]/.test(pw) },
  { id: "lower", label: "Una minúscula", test: (pw) => /[a-z]/.test(pw) },
  { id: "digit", label: "Un número", test: (pw) => /\d/.test(pw) },
  {
    id: "symbol",
    label: "Un símbolo (!@#$%^&*()_-=+<>?)",
    test: (pw) => /[!@#$%^&*()_\-+=<>?]/.test(pw),
  },
  {
    id: "noconsec",
    label: "Sin números consecutivos",
    test: (pw) =>
      pw.length > 0 && !/(012|123|234|345|456|567|678|789)/.test(pw),
  },
];

export default function SuperAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Mi usuario actual (para excluirlo de la tabla y duplicados)
  const [meName, setMeName] = useState("");

  // Usuarios y selección
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  // Formulario
  const [form, setForm] = useState({
    nombreUsuario: "",
    rol: 2,
    password: "",
    confirmPassword: "",
  });

  // Mostrar/ocultar contraseña
  const [showPW, setShowPW] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);

  // Validación de criterios de password
  const [crit, setCrit] = useState({});

  // Mensajes de error en el formulario
  const [error, setError] = useState("");

  // Toasts automáticos
  const [alertAuto, setAlertAuto] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Modal de confirmación de borrado
  const [showDelete, setShowDelete] = useState(false);

  // Sesión expirada
  const [sessionExpired, setSessionExpired] = useState(false);

  // Al montar: chequear token y cargar usuarios
  useEffect(() => {
    if (!token) {
      setSessionExpired(true);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now() || payload.rol !== 1) {
        setSessionExpired(true);
        return;
      }
      setMeName(payload.nombreUsuario);
      fetchUsers(payload.nombreUsuario);
    } catch {
      setSessionExpired(true);
    }
  }, []);

  // Fetch usuarios (excluye al propio)
  const fetchUsers = async (me) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const list = await res.json();
      setUsers(list.filter((u) => u.nombreUsuario !== me));
    } catch (e) {
      setError(e.message);
    }
  };

  // Validación de criterios de password
  useEffect(() => {
    const status = {};
    PW_CRITERIA.forEach((c) => {
      status[c.id] = c.test(form.password);
    });
    setCrit(status);
  }, [form.password]);

  // Detección de nombre duplicado
  const isDuplicateName =
    form.nombreUsuario.trim() &&
    (users.some(
      (u) =>
        u.nombreUsuario.toLowerCase() ===
          form.nombreUsuario.trim().toLowerCase() &&
        (!selected || u._id !== selected._id)
    ) ||
      form.nombreUsuario.trim().toLowerCase() === meName.toLowerCase());

  const handleSelect = (u) => {
    setSelected(u);
    setForm({
      nombreUsuario: u.nombreUsuario,
      rol: u.rol,
      password: "",
      confirmPassword: "",
    });
    setError("");
    setShowPW(false);
    setShowConfirmPW(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  };

  const handleCancel = () => {
    setSelected(null);
    setForm({
      nombreUsuario: "",
      rol: 2,
      password: "",
      confirmPassword: "",
    });
    setError("");
    setShowPW(false);
    setShowConfirmPW(false);
  };

  const validatePassword = () => {
    if (!selected && !form.password) {
      setError("La contraseña es obligatoria.");
      return false;
    }
    if (form.password) {
      if (form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return false;
      }
      if (!PW_CRITERIA.every((c) => c.test(form.password))) {
        setError("La contraseña no cumple todos los requisitos.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isDuplicateName) {
      setError("Ese usuario ya existe");
      return;
    }
    if (!form.nombreUsuario.trim()) {
      setError("Nombre requerido");
      return;
    }
    if (!validatePassword()) return;

    try {
      const url = selected
        ? `${import.meta.env.VITE_API_URL}/api/users/${selected._id}`
        : `${import.meta.env.VITE_API_URL}/api/users`;
      const method = selected ? "PATCH" : "POST";
      const body = {
        nombreUsuario: form.nombreUsuario.trim(),
        rol: Number(form.rol),
      };
      if (form.password) body.contrasena = form.password;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).message);

      await fetchUsers(meName);
      setAlertAuto({
        show: true,
        message: `Usuario ${
          selected ? "actualizado" : "creado"
        } correctamente.`,
        type: "success",
      });
      handleCancel();
    } catch (e) {
      setAlertAuto({ show: true, message: e.message, type: "error" });
    }
  };

  const handleDelete = () => {
    if (!selected) {
      setError("Selecciona un usuario.");
      return;
    }
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    setShowDelete(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${selected._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error((await res.json()).message);

      await fetchUsers(meName);
      setAlertAuto({
        show: true,
        message: "Usuario eliminado correctamente.",
        type: "success",
      });
      handleCancel();
    } catch (e) {
      setAlertAuto({ show: true, message: e.message, type: "error" });
    }
  };

  if (sessionExpired) {
    return <AlertaSesion show={true} />;
  }

  return (
    <div className="admin-container">
      {/* Toast automático */}
      <AlertAuto
        show={alertAuto.show}
        message={alertAuto.message}
        type={alertAuto.type}
        onClose={() => setAlertAuto((a) => ({ ...a, show: false }))}
      />

      <SidebarAdmin />
      <main className="admin-content">
        <div className="catadmin-card">
          {/* Tabla de usuarios */}
          <section
            className="catadmin-table-section"
            style={{ flex: 1, minWidth: 220 }}
          >
            <h2 className="catadmin-section-title">Usuarios</h2>
            <div className="catadmin-table-responsive">
              <table className="catadmin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className={
                        selected?._id === u._id
                          ? "catadmin-row-selected"
                          : ""
                      }
                      onClick={() => handleSelect(u)}
                    >
                      <td>{u.nombreUsuario}</td>
                      <td>
                        {u.rol === 1 ? "SuperAdmin" : "Admin"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Formulario */}
          <section
            className="catadmin-form-section"
            style={{ flex: 2, maxWidth: 520 }}
          >
            <h2 className="catadmin-section-title">
              {selected ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

            {error && <Alerta tipo="error" mensaje={error} />}

            <form className="catadmin-form" onSubmit={handleSubmit}>
              {/* Nombre de Usuario */}
              <label className="catadmin-label">
                Nombre de Usuario
                <input
                  className="catadmin-input"
                  name="nombreUsuario"
                  value={form.nombreUsuario}
                  onChange={handleChange}
                />
              </label>
              {form.nombreUsuario && isDuplicateName && (
                <p className="error-text">Ese usuario ya existe</p>
              )}

              {/* Rol */}
              <label className="catadmin-label">
                Rol
                <select
                  className="catadmin-input"
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                >
                  <option value={1}>SuperAdmin</option>
                  <option value={2}>Admin</option>
                </select>
              </label>

              {/* Contraseña */}
              <label className="catadmin-label">
                Contraseña
                <div className="password-wrapper">
                  <input
                    type={showPW ? "text" : "password"}
                    className="catadmin-input with-icon"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={
                      selected
                        ? "(déjalo en blanco para no cambiar)"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    className="show-toggle"
                    onClick={() => setShowPW((v) => !v)}
                    aria-label={
                      showPW ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    <i
                      className={showPW ? "bi bi-eye-slash" : "bi bi-eye"}
                    />
                  </button>
                </div>
              </label>

              {/* Confirmar Contraseña */}
              <label className="catadmin-label">
                Confirmar Contraseña
                <div className="password-wrapper">
                  <input
                    type={
                      showConfirmPW ? "text" : "password"
                    }
                    className="catadmin-input with-icon"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder={
                      selected
                        ? "(déjalo en blanco para no cambiar)"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    className="show-toggle"
                    onClick={() =>
                      setShowConfirmPW((v) => !v)
                    }
                    aria-label={
                      showConfirmPW
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    <i
                      className={
                        showConfirmPW
                          ? "bi bi-eye-slash"
                          : "bi bi-eye"
                      }
                    />
                  </button>
                </div>
              </label>

              {/* Criterios */}
              <div className="password-criteria">
                {PW_CRITERIA.map((c) => (
                  <div
                    key={c.id}
                    className={`crit ${
                      crit[c.id] ? "valid" : ""
                    }`}
                  >
                    <i
                      className={
                        crit[c.id]
                          ? "bi bi-check-circle-fill"
                          : "bi bi-circle"
                      }
                    />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Botones */}
              <div className="catadmin-btn-group">
                <button
                  type="submit"
                  className="catadmin-btn save"
                  disabled={isDuplicateName}
                >
                  {selected ? "Actualizar" : "Agregar"}
                </button>
                {selected && (
                  <button
                    type="button"
                    className="catadmin-btn danger"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                )}
                <button
                  type="button"
                  className="catadmin-btn cancel"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Modal de confirmación de borrado */}
      <Alerta2
        show={showDelete}
        title="Confirmar eliminación"
        message={`¿Seguro que quieres eliminar "${selected?.nombreUsuario}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
