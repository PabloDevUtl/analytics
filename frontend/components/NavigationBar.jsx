import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useScroll from '../hooks/useScroll';
import logoNegro from '../assets/analytics_logo_black.png';
import logoBlanco from '../assets/analytics_logo_white.png';

// 👇 Importa la función para obtener categorías
import { getCategorias } from '../JavaScript/cargarCategoria';

export default function NavigationBar() {
  const scrolled = useScroll(60);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Para mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dropdown categorías
  const [categorias, setCategorias] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias((data || []).filter(cat => cat.estatus === 1));
    }).catch(() => setCategorias([]));
  }, []);

  // Forzar nav blanco en ciertas rutas o al scrollear
  const forceWhiteRoute =
    ['/quienes-somos', '/contacto', '/avisocorto', '/avisolargo'].includes(pathname);
  const forceWhiteOnHomeMobile = isMobile && pathname === '/';
  const isWhite = scrolled || forceWhiteRoute || forceWhiteOnHomeMobile;
  const variant = isWhite ? 'light' : 'dark';

  // Ocultar el dropdown cuando haces scroll o cambias ruta
  useEffect(() => {
    setShowDropdown(false);
  }, [pathname, scrolled]);

  // Ir a la página de la categoría (ajusta la ruta como prefieras)
  const handleCategoriaClick = (cat) => {
    setShowDropdown(false);
    navigate(`/servicios?cat=${encodeURIComponent(cat.nombreCategoria)}`);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant={variant}
      className={`transition-navbar ${isWhite ? 'bg-white shadow-sm' : 'bg-transparent'}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logoBlanco} className="logo-light" height="70" width="140" alt="logo blanco" />
          <img src={logoNegro} className="logo-dark" height="50" width="130" alt="logo negro" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>INICIO</Nav.Link>
            <Nav.Link as={NavLink} to="/quienes-somos">QUIÉNES SOMOS</Nav.Link>
            
            {/* Dropdown personalizado de categorías */}
            <div
              className="custom-dropdown-nav"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={() => setShowDropdown(v => !v)}
              tabIndex={0}
              style={{ position: 'relative' }}
            >
              <span
                className={`nav-link ${pathname.startsWith('/servicios') ? 'active-nav-link' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                SERVICIOS
              </span>
              {showDropdown && (
                <div className="custom-dropdown-menu">
                  {categorias.length === 0 && (
                    <div className="dropdown-item empty">No hay categorías</div>
                  )}
                  {categorias.map(cat => (
                    <div
                      key={cat.idCategoria}
                      className="dropdown-item"
                      onClick={() => handleCategoriaClick(cat)}
                    >
                      {cat.nombreCategoria}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Nav.Link as={NavLink} to="/contacto">CONTÁCTANOS</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
