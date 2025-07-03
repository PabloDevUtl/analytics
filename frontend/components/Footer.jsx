import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/analytics_logo_black.png';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column footer-logo-column">
          <img src={logo} alt="Analytics Logo" className="footer-logo" />
        </div>

        <div className="footer-column footer-links-column">
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/quienes-somos">Quiénes somos</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">CONTÁCTANOS</Link></li>
          </ul>
        </div>

        <div className="footer-column footer-contact-column">
          <h4>Llámanos</h4>
          <a href='tel:+524771208831'>(477) 120 8831</a>
          <a href='tel:+524777878040'>(477) 787 8040</a>
          <a href='tel:+524772852360'>(477) 285 2360</a>
        </div>

        <div className="footer-column footer-address-column">
          <h4>Dirección</h4>
          <p>
            Calle: Filemón #309,<br/>
            Colonia: San Pablo,<br/>
            C.P. 37207 | León, Gto., México
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {/* 1) Enlace a Login */}
        <Link to="/login" className="footer-admin-link">Administrador</Link>

        {/* 2) Copyright + Aviso */}
        <p className="footer-copy">
© {year} Analytics | <Link to="/avisocorto" className="footer-bottom-link">Aviso de Privacidad</Link>        </p>

        {/* 3) Desarrollado por Juan Cano */}
        <p className="footer-dev">
          Desarrollado por <a href="#" className="footer-bottom-link">Juan Cano</a>
        </p>
      </div>
    </footer>
  );
}
