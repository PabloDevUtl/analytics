// src/components/NavigationBar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import useScroll from '../hooks/useScroll';
import logoNegro from '../assets/analytics_logo_black.png';
import logoBlanco from '../assets/analytics_logo_white.png';

export default function NavigationBar() {
  const scrolled = useScroll(60);
  const { pathname } = useLocation();

  // Detectar si estamos en móvil (<768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rutas donde siempre forzamos fondo y links oscuros (nav claro)
  const forceWhiteRoute =
    ['/quienes-somos', '/contacto', '/avisocorto', '/avisolargo'].includes(pathname);

  // ➔ Fuerza nav claro (light) en Home cuando estamos en móvil
  const forceWhiteOnHomeMobile = isMobile && pathname === '/';

  const isWhite = scrolled || forceWhiteRoute || forceWhiteOnHomeMobile;
  const variant = isWhite ? 'light' : 'dark';

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant={variant}
      className={`transition-navbar ${isWhite ? 'bg-white shadow-sm' : 'bg-transparent'}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logoBlanco}
            className="logo-light"
            height="70"
            width="140"
            alt="logo blanco"
          />
          <img
            src={logoNegro}
            className="logo-dark"
            height="50"
            width="130"
            alt="logo negro"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {[
              { to: '/', label: 'INICIO', end: true },
              { to: '/quienes-somos', label: 'QUIÉNES SOMOS' },
              { to: '/servicios', label: 'SERVICIOS' },
              { to: '/contacto', label: 'CONTÁCTANOS' },
            ].map(({ to, label, end }) => (
              <Nav.Link
                as={NavLink}
                to={to}
                end={end}
                key={to}
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : undefined
                }
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
