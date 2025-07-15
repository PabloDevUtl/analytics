import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import logoNegro from "../assets/analytics_logo_black.png";
import logoBlanco from "../assets/analytics_logo_white.png";
import { getCategorias } from "../JavaScript/cargarCategoria";

function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NavigationBar() {
  const scrolled = useScroll(60);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Detecta dispositivos colapsables (<992px, igual que Bootstrap "lg")
  const [isCollapsedDevice, setIsCollapsedDevice] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => setIsCollapsedDevice(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showCollapse, setShowCollapse] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategorias((data || []).filter((cat) => cat.estatus === 1));
      })
      .catch(() => setCategorias([]));
  }, []);

  const forceWhiteRoute = [
    "/quienes-somos",
    "/contacto",
    "/avisocorto",
    "/avisolargo",
    "/servicios-page"
  ].includes(pathname);
  const forceWhiteOnHomeMobile = isCollapsedDevice && pathname === "/";
  const isWhite = scrolled || forceWhiteRoute || forceWhiteOnHomeMobile;
  const variant = isWhite ? "light" : "dark";

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname, scrolled]);

  // Dropdown handlers
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setShowDropdown(false), 130);
  };

  // ¡CAMBIADO! Ir a /servicios/slug-categoria
  const handleCategoriaClick = (cat) => {
    setShowDropdown(false);
    navigate(`/servicios/${slugify(cat.nombreCategoria)}`);
    if (isCollapsedDevice) setShowCollapse(false);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant={variant}
      className={`transition-navbar ${isWhite ? "bg-white shadow-sm" : "bg-transparent"}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logoBlanco} className="logo-light" height="70" width="140" alt="logo blanco" />
          <img src={logoNegro} className="logo-dark" height="50" width="130" alt="logo negro" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" onClick={() => setShowCollapse(v => !v)} />
        <Navbar.Collapse in={showCollapse} id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end onClick={() => isCollapsedDevice && setShowCollapse(false)}>
              INICIO
            </Nav.Link>
            <Nav.Link as={NavLink} to="/quienes-somos" onClick={() => isCollapsedDevice && setShowCollapse(false)}>
              QUIÉNES SOMOS
            </Nav.Link>

            {/* Dropdown personalizado de categorías */}
            <div
              className="custom-dropdown-nav"
              onMouseEnter={!isCollapsedDevice ? handleDropdownEnter : undefined}
              onMouseLeave={!isCollapsedDevice ? handleDropdownLeave : undefined}
              onClick={isCollapsedDevice ? () => setShowDropdown((v) => !v) : undefined}
              tabIndex={0}
              style={{ position: "relative" }}
            >
              <span
                className={`nav-link ${pathname.startsWith("/servicios") ? "active-nav-link" : ""}`}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                SERVICIOS
              </span>
              {showDropdown && (
                <div className="custom-dropdown-menu">
                  <div className="dropdown-grid">
                    {categorias.length === 0 && (
                      <div className="dropdown-item empty">Cargando servicios</div>
                    )}
                    {categorias.map((cat) => (
                      <div
                        key={cat.idCategoria}
                        className="dropdown-item"
                        onClick={() => handleCategoriaClick(cat)}
                      >
                        {cat.nombreCategoria}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Nav.Link as={NavLink} to="/contacto" onClick={() => isCollapsedDevice && setShowCollapse(false)}>
              CONTÁCTANOS
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
