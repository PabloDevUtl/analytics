// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import QuienesSomos from '../components/QuienesSomos';
import fondoAlarma  from '../assets/fondoAlarma.png';
import fondoCamaras from '../assets/fondoCamara.png';
import fondoRedes   from '../assets/fondoRedes.png';
import iconWhatsApp from '../assets/iconWhatsApp.png';

export default function Home() {
  const images = [fondoAlarma, fondoCamaras, fondoRedes];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      AOS.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Hero */}
      <section
        id="inicio"
        style={{ '--bg-image': `url(${images[currentIndex]})` }}
        data-aos="fade-up" data-aos-delay="100"
      >
        <div className="hero-content" data-aos="fade-right" data-aos-delay="200">
          <h1 className="hero-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <a href="#servicios" className="btn btn-hero" data-aos="fade-left" data-aos-delay="300">
            Ver Servicios
          </a>
        </div>
        <div className="carousel-hero-controls" data-aos="fade-up" data-aos-delay="400">
          <div className="carousel-dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Innovación */}
      <section
        id="innovacion"
        className="innovacion-section"
        data-aos="fade-up" data-aos-delay="100"
      >
        <div className="innovacion-line" data-aos="fade-right" data-aos-delay="200">
          <span className="line"></span>
          <span className="dot"></span>
        </div>
        <h2 className="innovacion-title" data-aos="fade-left" data-aos-delay="300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
        </h2>
      </section>

      {/* Preview Quiénes somos */}
      <QuienesSomos />

      {/* Servicios */}
      <section id="servicios" data-aos="fade-up" data-aos-delay="200">
        Servicios
      </section>

      {/* Contacto */}
      <section id="contacto" data-aos="fade-up" data-aos-delay="300">
        Contacto
      </section>

      {/* WhatsApp fijo */}
      <a
        href="https://wa.me/5214771208831"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon-container"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <span className="whatsapp-label">CONTÁCTANOS</span>
        <img src={iconWhatsApp} alt="WhatsApp" className="whatsapp-icon" />
      </a>
    </>
  );
}
