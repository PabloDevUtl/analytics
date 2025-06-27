// src/pages/QuienesSomosPage.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Imágenes
import fondoQuien from '../assets/fondoQuien.png';
import fondoIntegridad from '../assets/fondoIntegridad.png'; // para el valor 9
import iconWhatsApp from '../assets/iconWhatsApp.png';

// CSS específico de esta página
import '../styles/QuienesSomosPage.css';

export default function QuienesSomosPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ===============================
          SECCIÓN: “Quiénes somos” (original)
         =============================== */}
      <section id="quienesSomosPage" className="quienes-full-section">
        <div className="quienes-full-image" data-aos="fade-right">
          <img src={fondoQuien} alt="Fondo Quiénes somos" />
        </div>
        <div className="quienes-full-content" data-aos="fade-left">
          <h2 className="quienes-full-title">¿Quiénes somos?</h2>
          <p className="quienes-full-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="quienes-full-text">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* ===============================
          SECCIÓN: Misión (fondo gris)
         =============================== */}
      <section className="mision-section">
        <div className="mision-container">
          <h3 className="mision-title" data-aos="fade-down">
            Misión
          </h3>
          <div className="mision-underline" data-aos="fade-left" data-aos-delay="100" />
          <p className="mision-quote" data-aos="fade-up" data-aos-delay="200">
      “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
          </p>
          <p className="mision-text" data-aos="fade-up" data-aos-delay="300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia 
      odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
      Mauris ultricies, urna at pulvinar rutrum, sapien ipsum ultrices purus, 
      et malesuada lectus nisi nec erat. Phasellus dignissim pulvinar urna, vel 
      tristique lacus efficitur et.
          </p>
        </div>
      </section>

      {/* ===============================
          SECCIÓN: Visión (fondo blanco)
         =============================== */}
      <section className="vision-section">
        <div className="vision-container">
          <h3 className="vision-title" data-aos="fade-down">
            Visión
          </h3>
          <div className="vision-underline" data-aos="fade-left" data-aos-delay="100" />
          <p className="vision-quote" data-aos="fade-up" data-aos-delay="200">
      “Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
          </p>
          <p className="vision-text" data-aos="fade-up" data-aos-delay="300">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
      velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>

      {/* ===============================
          SECCIÓN: Nuestros valores (nuevo bloque)
         =============================== */}
      <section className="valores-section">
        <div className="valores-container">
          <h3 className="valores-title" data-aos="fade-down">
            Nuestros valores
          </h3>

          {/* Valores 1–8 en dos columnas */}
          <div className="valores-list">
            {/* Valor 1 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="100">
              <span className="valor-number">1</span>
              <h4 className="valor-name">Integridad</h4>
              <hr />
              <p className="valor-desc">
                Cumplimiento a toda costa de nuestros compromisos que asumimos,
                esperando lo mismo de los demás.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="200">
              <span className="valor-number">2</span>
              <h4 className="valor-name">Honestidad</h4>
              <hr />
              <p className="valor-desc">
                Transparencia, ante todo.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="300">
              <span className="valor-number">3</span>
              <h4 className="valor-name">Congruencia</h4>
              <hr />
              <p className="valor-desc">
                Siempre hacemos lo que decimos.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="400">
              <span className="valor-number">4</span>
              <h4 className="valor-name">Creatividad</h4>
              <hr />
              <p className="valor-desc">
                Diseño de espacios únicos, hogares diferentes y exclusivos.
              </p>
            </div>

            {/* Valor 5 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="500">
              <span className="valor-number">5</span>
              <h4 className="valor-name">Rentabilidad</h4>
              <hr />
              <p className="valor-desc">
                Incrementar el valor de la inversión de nuestros clientes.
              </p>
            </div>

            {/* Valor 6 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="600">
              <span className="valor-number">6</span>
              <h4 className="valor-name">Espíritu de servicio</h4>
              <hr />
              <p className="valor-desc">
                Nos debemos a nuestros clientes.
              </p>
            </div>

            {/* Valor 7 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="700">
              <span className="valor-number">7</span>
              <h4 className="valor-name">Equidad</h4>
              <hr />
              <p className="valor-desc">
                Trabajamos de manera permanente en una relación ganar-ganar.
              </p>
            </div>

            {/* Valor 8 */}
            <div className="valor-item" data-aos="fade-up" data-aos-delay="800">
              <span className="valor-number">8</span>
              <h4 className="valor-name">Compromiso</h4>
              <hr />
              <p className="valor-desc">
                Nuestros colaboradores nos impulsan a desarrollar y lograr todos nuestros objetivos.
              </p>
            </div>
          </div>

          {/* Valor 9: texto a la izquierda y foto a la derecha */}
          <div className="valor-nine" data-aos="fade-up" data-aos-delay="900">
            <div className="valor-nine-text">
              <span className="valor-number">9</span>
              <h4 className="valor-name">Responsabilidad social</h4>
              <hr />
              <p className="valor-desc">
                Trabajamos constantemente por ser un buen ciudadano empresarial,
                ayudando a impulsar el desarrollo de nuestra comunidad y de México.
              </p>
            </div>
            <div className="valor-nine-image" data-aos="fade-left" data-aos-delay="1000">
              <img src={fondoIntegridad} alt="Responsabilidad social" />
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          ICONO WhatsApp FIJO (repetido al final)
         =============================== */}
      <a
        href="https://wa.me/5214771208831"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon-container"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <span className="whatsapp-label">CONTACTÁNOS</span>
        <img src={iconWhatsApp} alt="WhatsApp" className="whatsapp-icon" />
      </a>
    </>
  );
}
