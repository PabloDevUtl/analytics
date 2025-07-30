import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/SidebarAdmin.css";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Overlay de menú
  const [menuOpen, setMenuOpen] = useState(false);
  // Rol y nombre de usuario
  const [rol, setRol] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Cada vez que cambie ruta, cerramos el menú
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Leer JWT
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRol(payload.rol);
      setUsername(payload.nombreUsuario);
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ------------------ VISTA MÓVIL ------------------
  if (isMobile) {
    return (
      <>
        {/* Barra fija inferior */}
        <nav className="mobile-bottom-nav">
          <NavLink to="/home-admin" className="bottom-item">
            <i className="bi bi-house" /><span>Inicio</span>
          </NavLink>
          <NavLink to="/servicios-admin" className="bottom-item">
            <i className="bi bi-gear" /><span>Servicios</span>
          </NavLink>
          <NavLink to="/categorias-admin" className="bottom-item">
            <i className="bi bi-tags" /><span>Categorías</span>
          </NavLink>
          <button
            className="bottom-item"
            onClick={() => setMenuOpen(true)}
          >
            <i className="bi bi-list" /><span>Menú</span>
          </button>
        </nav>

        {/* Overlay de menú completo */}
        {menuOpen && (
          <div className="mobile-menu-overlay">
            <header className="overlay-header">
              <span className="username">{username}</span>
              <button
                className="close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <i className="bi bi-x-lg" />
              </button>
            </header>
            <ul className="overlay-list">
              <li>
                <NavLink to="/usuario-admin" className="overlay-link">
                  <i className="bi bi-person-circle" />Mi cuenta
                </NavLink>
              </li>
              <li>
                <NavLink to="/home-admin" className="overlay-link">
                  <i className="bi bi-house" />Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/servicios-admin" className="overlay-link">
                  <i className="bi bi-gear" />Servicios
                </NavLink>
              </li>
              <li>
                <NavLink to="/categorias-admin" className="overlay-link">
                  <i className="bi bi-tags" />Categorías
                </NavLink>
              </li>
              {rol === 1 && (
                <li>
                  <NavLink to="/super-admin" className="overlay-link">
                    <i className="bi bi-people" />Usuarios
                  </NavLink>
                </li>
              )}
            </ul>
            <footer className="overlay-footer">
              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right" />Salir
              </button>
            </footer>
          </div>
        )}
      </>
    );
  }

  // ------------------ VISTA DESKTOP ------------------
  return (
    <>
      <button
        className="toggle-btn"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list" />
      </button>
      <nav className={`sidebar ${menuOpen ? "" : "collapsed"}`}>
        <div className="menu">
          <NavLink to="/home-admin" className="menu-item">
            <i className="bi bi-house" /> Inicio
          </NavLink>
          <NavLink to="/servicios-admin" className="menu-item">
            <i className="bi bi-gear" /> Servicios
          </NavLink>
          <NavLink to="/categorias-admin" className="menu-item">
            <i className="bi bi-tags" /> Categorías
          </NavLink>
          {rol === 1 && (
            <NavLink to="/super-admin" className="menu-item">
              <i className="bi bi-people" /> Usuarios
            </NavLink>
          )}
          <NavLink to="/usuario-admin" className="menu-item">
            <i className="bi bi-person-circle" /> Mi cuenta
          </NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" /> Salir
        </button>
      </nav>
    </>
  );
}
