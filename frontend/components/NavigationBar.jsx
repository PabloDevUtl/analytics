// src/components/NavigationBar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import useScroll from '../hooks/useScroll';
import logoNegro from '../assets/analytics_logo_black.png';
import logoBlanco from '../assets/analytics_logo_white.png';

export default function NavigationBar() {
  const scrolled = useScroll(60);
  const { pathname } = useLocation();

  // fuerza blanco cuando estamos en /quienes-somos
  const forceWhite = pathname === '/quienes-somos' || pathname === '/contacto' || pathname==='/avisocorto' || pathname === '/avisocorto' ;
   const forceWhite2 = pathname === '/avisolargo' || pathname === '/avisolargo';
  const isWhite    = scrolled || forceWhite || forceWhite2;
  const variant    = isWhite ? 'light' : 'dark';

  return (
    <Navbar
      expand="lg" fixed="top"
      className={`transition-navbar ${isWhite ? 'bg-white shadow-sm' : 'bg-transparent'}`}
      variant={variant}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logoBlanco} className="logo-light" height="70" width="140" alt="logo blanco" />
          <img src={logoNegro}  className="logo-dark"  height="50" width="130" alt="logo negro" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">INICIO</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos">QUIÉNES SOMOS</Nav.Link>
            <Nav.Link as={Link} to="/servicios">SERVICIOS</Nav.Link>
            <Nav.Link as={Link} to="/contacto">CONTACTÁNOS</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
