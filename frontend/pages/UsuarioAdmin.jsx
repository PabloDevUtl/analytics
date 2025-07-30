import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import AlertAuto from "../components/AlertAuto";
import "../styles/AdminPages.css";

const PW_CRITERIA = [
  { id: "length", label: "8+ caracteres", test: (pw) => pw.length >= 8 },
  { id: "upper",  label: "Una mayúscula",   test: (pw) => /[A-Z]/.test(pw) },
  { id: "lower",  label: "Una minúscula",   test: (pw) => /[a-z]/.test(pw) },
  { id: "digit",  label: "Un número",       test: (pw) => /\d/.test(pw) },
  {
    id: "symbol",
    label: "Un símbolo (!@#$%^&*()_-=+<>?)",
    test: (pw) => /[!@#$%^&*()_\-+=<>?]/.test(pw),
  },
  {
    id: "noconsec",
    label: "Sin números consecutivos",
    test: (pw) => pw.length > 0 && !/(012|123|234|345|456|567|678|789)/.test(pw),
  },
];

export default function UsuarioAdmin() {
  const nav = useNavigate();

  // — Estado usuario —
  const [origUser, setOrigUser]       = useState("");
  const [inputUser, setInputUser]     = useState("");
  const [allUsernames, setAllUsernames] = useState([]);
  const [uError, setUError]           = useState("");
  const [uSuccess, setUSuccess]       = useState("");

  // — Estado contraseña —
  const [current, setCurrent]         = useState("");
  const [new1, setNew1]               = useState("");
  const [new2, setNew2]               = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPWError]         = useState("");
  const [pwSuccess, setPWSuccess]     = useState("");
  const [crit, setCrit]               = useState({});

  // Fetch inicial de MI usuario y de todos los usuarios
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return nav("/login");

    // primero obtenemos mis datos
    fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((me) => {
        setOrigUser(me.nombreUsuario);
      })
      .catch(() => nav("/login"));

    // luego la lista de usuarios para validar duplicados
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((list) => {
        setAllUsernames(list.map((u) => u.nombreUsuario.toLowerCase()));
      })
      .catch((err) => console.error(err));
  }, [nav]);

  // Validación en vivo de criterios de contraseña
  useEffect(() => {
    const status = {};
    PW_CRITERIA.forEach((c) => {
      status[c.id] = c.test(new1);
    });
    setCrit(status);
  }, [new1]);

  // — Guardar usuario —
  const handleUser = async (e) => {
    e.preventDefault();
    setUError("");
    setUSuccess("");

    const trimmed = inputUser.trim();
    const len = trimmed.length;
    if (len < 8 || len > 30) {
      setUError("El usuario debe tener entre 8 y 30 caracteres");
      return;
    }
    const isDuplicate =
      allUsernames.includes(trimmed.toLowerCase()) &&
      trimmed.toLowerCase() !== origUser.toLowerCase();
    if (isDuplicate) {
      setUError("Ya existe ese nombre de usuario");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/me/username`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombreUsuario: trimmed }),
        }
      );
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);
      setOrigUser(trimmed);
      setInputUser("");
      setUSuccess("Usuario actualizado correctamente");
      setAllUsernames((prev) =>
        prev
          .filter((u) => u !== origUser.toLowerCase())
          .concat(trimmed.toLowerCase())
      );
    } catch (err) {
      setUError(err.message);
    }
  };

  const handleUserCancel = () => {
    setInputUser("");
    setUError("");
    setUSuccess("");
  };

  // — Guardar contraseña —
  const handlePW = async (e) => {
    e.preventDefault();
    setPWError("");
    setPWSuccess("");

    if (new1 !== new2) {
      setPWError("Las contraseñas no coinciden");
      return;
    }
    if (!PW_CRITERIA.every((c) => c.test(new1))) {
      setPWError("La contraseña no cumple todos los requisitos");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/me/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: current,
            newPassword: new1,
          }),
        }
      );
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);
      setPWSuccess("Contraseña actualizada correctamente");
      setCurrent("");
      setNew1("");
      setNew2("");
    } catch (err) {
      setPWError(err.message);
    }
  };

  const handlePWCancel = () => {
    setCurrent("");
    setNew1("");
    setNew2("");
    setPWError("");
    setPWSuccess("");
  };

  // Duplicado local para mostrar mensaje
  const isDuplicateInput =
    inputUser.trim().length >= 8 &&
    allUsernames.includes(inputUser.trim().toLowerCase()) &&
    inputUser.trim().toLowerCase() !== origUser.toLowerCase();

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="admin-content">
        <header className="admin-header">
          <h1 className="admin-title">Mi Cuenta</h1>
        </header>

        {/* — Cambio de usuario — */}
        <section className="usuario-section">
          <h2>Cambiar usuario</h2>
          <p className="current-label">
            Usuario actual: <strong>{origUser}</strong>
          </p>
          <form onSubmit={handleUser} className="usuario-form">
            <label className="catadmin-label">
              Nuevo nombre de usuario
              <input
                className="catadmin-input"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
            </label>
            {isDuplicateInput && (
              <p className="error-text">Ese usuario ya existe</p>
            )}
            <div className="catadmin-btn-group">
              <button
                type="submit"
                className="catadmin-btn save"
                disabled={
                  !(inputUser.trim().length >= 8 &&
                    inputUser.trim().length <= 30 &&
                    (!allUsernames.includes(inputUser.trim().toLowerCase()) ||
                      inputUser.trim().toLowerCase() === origUser.toLowerCase()))
                }
              >
                Guardar usuario
              </button>
              <button
                type="button"
                onClick={handleUserCancel}
                className="catadmin-btn cancel"
              >
                Cancelar
              </button>
            </div>
          </form>
          <AlertAuto
            show={!!uSuccess}
            message={uSuccess}
            type="success"
            onClose={() => setUSuccess("")}
          />
          <AlertAuto
            show={!!uError}
            message={uError}
            type="error"
            onClose={() => setUError("")}
          />
        </section>

        {/* — Cambio de contraseña — */}
        <section className="usuario-section password-section">
          <h2>Cambiar contraseña</h2>
          <form onSubmit={handlePW} className="usuario-form">

            {/* Contraseña actual */}
            <label className="catadmin-label">
              Contraseña actual
              <div className="password-wrapper">
                <input
                  className="catadmin-input with-icon"
                  type={showCurrent ? "text" : "password"}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                />
                <button
                  type="button"
                  className="show-toggle"
                  onClick={() => setShowCurrent(v => !v)}
                  aria-label={ showCurrent ? "Ocultar contraseña" : "Mostrar contraseña" }
                >
                  <i className={ showCurrent ? "bi bi-eye-slash" : "bi bi-eye" } />
                </button>
              </div>
            </label>

            {/* Nueva contraseña */}
            <label className="catadmin-label">
              Nueva contraseña
              <div className="password-wrapper">
                <input
                  className="catadmin-input with-icon"
                  type={showNew ? "text" : "password"}
                  value={new1}
                  onChange={(e) => setNew1(e.target.value)}
                />
                <button
                  type="button"
                  className="show-toggle"
                  onClick={() => setShowNew(v => !v)}
                  aria-label={ showNew ? "Ocultar contraseña" : "Mostrar contraseña" }
                >
                  <i className={ showNew ? "bi bi-eye-slash" : "bi bi-eye" } />
                </button>
              </div>
            </label>

            {/* Confirmar nueva contraseña */}
            <label className="catadmin-label">
              Confirmar nueva contraseña
              <div className="password-wrapper">
                <input
                  className="catadmin-input with-icon"
                  type={showConfirm ? "text" : "password"}
                  value={new2}
                  onChange={(e) => setNew2(e.target.value)}
                />
                <button
                  type="button"
                  className="show-toggle"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={ showConfirm ? "Ocultar contraseña" : "Mostrar contraseña" }
                >
                  <i className={ showConfirm ? "bi bi-eye-slash" : "bi bi-eye" } />
                </button>
              </div>
            </label>

            <div className="password-criteria">
              {PW_CRITERIA.map(c => (
                <div key={c.id} className={`crit ${crit[c.id] ? "valid" : ""}`}>
                  <i className={ crit[c.id] ? "bi bi-check-circle-fill" : "bi bi-circle" } />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>

            <div className="catadmin-btn-group">
              <button
                type="submit"
                className="catadmin-btn save"
                disabled={!(current && new1 && new2)}
              >
                Guardar contraseña
              </button>
              <button
                type="button"
                onClick={handlePWCancel}
                className="catadmin-btn cancel"
              >
                Cancelar
              </button>
            </div>

          </form>
          <AlertAuto show={!!pwSuccess} message={pwSuccess} type="success" onClose={() => setPWSuccess("")} />
          <AlertAuto show={!!pwError}   message={pwError}   type="error"   onClose={() => setPWError("")} />
        </section>

      </div>
    </div>
  );
}
