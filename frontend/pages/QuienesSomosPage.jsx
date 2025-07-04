// src/pages/QuienesSomosPage.jsx
import React, { useEffect } from 'react';
import fondoQuien from '../assets/fondoQuien.png';
import fondoIntegridad from '../assets/fondoIntegridad.png';
import iconWhatsApp from '../assets/iconWhatsApp.png';
import '../styles/QuienesSomosPage.css';

export default function QuienesSomosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // IntersectionObserver para animaciones manuales
    const elements = document.querySelectorAll(
      '.animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-zoom-in, .animate-blur-in, .animate-bounce-in'
    );
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.08 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* SECCIÓN: “Quiénes somos” */}
      <section id="quienesSomosPage" className="quienes-full-section">
        <div className="quienes-full-image animate-zoom-in">
          <img src={fondoQuien} alt="Fondo Quiénes somos" />
        </div>
        <div className="quienes-full-content animate-fade-left">
          <h2 className="quienes-full-title animate-fade-down">¿Quiénes somos?</h2>
          <p className="quienes-full-text animate-blur-in">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="quienes-full-text animate-blur-in">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* SECCIÓN: Misión */}
      <section className="mision-section">
        <div className="mision-container animate-fade-up">
          <h3 className="mision-title animate-zoom-in">Misión</h3>
          <div className="mision-underline animate-fade-left" />
          <p className="mision-quote animate-fade-up">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
          </p>
          <p className="mision-text animate-blur-in">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia 
            odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
            Mauris ultricies, urna at pulvinar rutrum, sapien ipsum ultrices purus, 
            et malesuada lectus nisi nec erat. Phasellus dignissim pulvinar urna, vel 
            tristique lacus efficitur et.
          </p>
        </div>
      </section>

      {/* SECCIÓN: Visión */}
      <section className="vision-section">
        <div className="vision-container animate-fade-up">
          <h3 className="vision-title animate-zoom-in">Visión</h3>
          <div className="vision-underline animate-fade-right" />
          <p className="vision-quote animate-fade-up">
            “Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
          </p>
          <p className="vision-text animate-blur-in">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>

      {/* SECCIÓN: Nuestros valores */}
      <section className="valores-section">
        <div className="valores-container">
          <h3 className="valores-title animate-zoom-in">
            Nuestros valores
          </h3>
          <div className="valores-list">
            <div className="valor-item animate-fade-up" data-delay="1">
              <span className="valor-number animate-fade-left">1</span>
              <h4 className="valor-name animate-blur-in">Integridad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Cumplimiento a toda costa de nuestros compromisos que asumimos,
                esperando lo mismo de los demás.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="2">
              <span className="valor-number animate-fade-left">2</span>
              <h4 className="valor-name animate-blur-in">Honestidad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Transparencia, ante todo.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="3">
              <span className="valor-number animate-fade-left">3</span>
              <h4 className="valor-name animate-blur-in">Congruencia</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Siempre hacemos lo que decimos.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="4">
              <span className="valor-number animate-fade-left">4</span>
              <h4 className="valor-name animate-blur-in">Creatividad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Diseño de espacios únicos, hogares diferentes y exclusivos.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="5">
              <span className="valor-number animate-fade-left">5</span>
              <h4 className="valor-name animate-blur-in">Rentabilidad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Incrementar el valor de la inversión de nuestros clientes.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="6">
              <span className="valor-number animate-fade-left">6</span>
              <h4 className="valor-name animate-blur-in">Espíritu de servicio</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Nos debemos a nuestros clientes.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="7">
              <span className="valor-number animate-fade-left">7</span>
              <h4 className="valor-name animate-blur-in">Equidad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Trabajamos de manera permanente en una relación ganar-ganar.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="8">
              <span className="valor-number animate-fade-left">8</span>
              <h4 className="valor-name animate-blur-in">Compromiso</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Nuestros colaboradores nos impulsan a desarrollar y lograr todos nuestros objetivos.
              </p>
            </div>
          </div>
          {/* Valor 9: con efecto "bounce-in" y "zoom-in" */}
          <div className="valor-nine animate-bounce-in" data-delay="9">
            <div className="valor-nine-text">
              <span className="valor-number animate-fade-left">9</span>
              <h4 className="valor-name animate-zoom-in">Responsabilidad social</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Trabajamos constantemente por ser un buen ciudadano empresarial,
                ayudando a impulsar el desarrollo de nuestra comunidad y de México.
              </p>
            </div>
            <div className="valor-nine-image animate-zoom-in">
              <img src={fondoIntegridad} alt="Responsabilidad social" />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp fijo */}
      <a
        href="https://wa.me/5214771208831"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon-container animate-fade-up"
      >
        <span className="whatsapp-label">CONTÁCTANOS</span>
        <img src={iconWhatsApp} alt="WhatsApp" className="whatsapp-icon" />
      </a>
    </>
  );
}
