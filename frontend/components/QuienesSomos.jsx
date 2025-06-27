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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="quienes-text">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
