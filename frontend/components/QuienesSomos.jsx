// src/pages/QuienesSomos.jsx
import React from 'react';
import { Link } from 'react-router-dom';      // <-- importamos Link
import fondoQuien from '../assets/fondoQuien.png';
import '../styles/QuienesSomos.css';

export default function QuienesSomos() {
  return (
    <section id="quienesSomos" className="quienes-section">
      <div className="quienes-image" data-aos="fade-right">
        <img src={fondoQuien} alt="Fondo Quiénes somos" />
      </div>
      <div className="quienes-content" data-aos="fade-left">
        <h2 className="quienes-title">¿Quiénes somos?</h2>
        <p className="quienes-text">
En Analitycs creemos en el poder de la tecnología como motor de transformación. 
Somos un equipo comprometido con brindar soluciones innovadoras, funcionales y 
seguras para empresas, instituciones y hogares.        </p>
        <p className="quienes-text">
         Nos apasiona contribuir al desarrollo tecnológico de México mediante servicios de calidad en seguridad, 
         software, energías e innovación, y capacitación profesional.
        </p>

        {/* ===== BOTÓN “Conoce más” ===== */}
        <Link
          to="/quienes-somos"
          className="btn-conoce"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          Conoce más
        </Link>
      </div>
      
    </section>
  );
}
