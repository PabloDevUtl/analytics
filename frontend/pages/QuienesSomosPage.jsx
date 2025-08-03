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
           En Analitycs ofrecemos soluciones tecnológicas diseñadas para fortalecer 
           la seguridad, eficiencia y desarrollo digital de empresas y hogares. 
           Nuestro equipo combina experiencia e innovación para atender las necesidades 
           reales de cada cliente.
          </p>
          <p className="quienes-full-text animate-blur-in">
           Brindamos servicios en sistemas de seguridad, desarrollo de software,
            energías renovables, TI y capacitación. Nuestro compromiso es impulsar
             el crecimiento tecnológico en México con soluciones funcionales, confiables
              y a la medida.
          </p>
        </div>
      </section>

      {/* SECCIÓN: Misión */}
      <section className="mision-section">
        <div className="mision-container animate-fade-up">
          <h3 className="mision-title animate-zoom-in">Misión</h3>
          <div className="mision-underline animate-fade-left" />
          <p className="mision-quote animate-fade-up">
           “Impulsar el crecimiento de personas y organizaciones a través de la tecnología”
          </p>
          <p className="mision-text animate-blur-in">
          Creemos que cada reto tecnológico es una oportunidad para avanzar. Nuestra misión
           es brindar soluciones funcionales, seguras e innovadoras que ayuden a empresas, 
           instituciones y comunidades a evolucionar, optimizar sus procesos y enfrentar 
           el futuro con confianza.
          </p>
        </div>
      </section>

      {/* SECCIÓN: Visión */}
      <section className="vision-section">
        <div className="vision-container animate-fade-up">
          <h3 className="vision-title animate-zoom-in">Visión</h3>
          <div className="vision-underline animate-fade-right" />
          <p className="vision-quote animate-fade-up">
"Ser líderes en innovación tecnológica al servicio del crecimiento empresarial y social"
          </p>
          <p className="vision-text animate-blur-in">
            Visualizamos un futuro donde la tecnología sea un aliado accesible y 
            estratégico para transformar la vida de las personas, las organizaciones y 
            las comunidades. En Analitycs trabajamos para desarrollar soluciones que 
            inspiren confianza, mejoren procesos y generen un impacto positivo en el
             entorno, siempre con un enfoque humano, ético y profesional.
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
              <h4 className="valor-name animate-blur-in">Innovación</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Creamos soluciones tecnológicas que responden a los desafíos actuales y futuros de nuestros clientes.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="2">
              <span className="valor-number animate-fade-left">2</span>
              <h4 className="valor-name animate-blur-in">Confianza</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
               Actuamos con transparencia y responsabilidad para generar relaciones sólidas y duraderas.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="3">
              <span className="valor-number animate-fade-left">3</span>
              <h4 className="valor-name animate-blur-in">Compromiso</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Cumplimos cada proyecto con pasión, enfoque y profesionalismo, superando expectativas.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="4">
              <span className="valor-number animate-fade-left">4</span>
              <h4 className="valor-name animate-blur-in">Calidad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
Ofrecemos servicios y desarrollos con altos estándares técnicos, funcionales y operativos.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="5">
              <span className="valor-number animate-fade-left">5</span>
              <h4 className="valor-name animate-blur-in">Orientación al cliente</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Escuchamos, entendemos y actuamos con base en las necesidades reales de cada cliente.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="6">
              <span className="valor-number animate-fade-left">6</span>
              <h4 className="valor-name animate-blur-in">Colaboración</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Fomentamos el trabajo en equipo, tanto dentro de nuestra organización como con nuestros aliados.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="7">
              <span className="valor-number animate-fade-left">7</span>
              <h4 className="valor-name animate-blur-in">Adaptabilidad</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
Nos reinventamos continuamente para responder con agilidad a un entorno tecnológico cambiante.
              </p>
            </div>
            <div className="valor-item animate-fade-up" data-delay="8">
              <span className="valor-number animate-fade-left">8</span>
              <h4 className="valor-name animate-blur-in">Ética profesional</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
Tomamos decisiones responsables, justas y respetuosas en todos nuestros procesos.
              </p>
            </div>
          </div>
          {/* Valor 9: con efecto "bounce-in" y "zoom-in" */}
          <div className="valor-nine animate-bounce-in" data-delay="9">
            <div className="valor-nine-text">
              <span className="valor-number animate-fade-left">9</span>
              <h4 className="valor-name animate-zoom-in">Impacto social</h4>
              <hr />
              <p className="valor-desc animate-fade-up">
                Desarrollamos tecnología que mejora vidas, 
                contribuye al entorno y transforma comunidades.
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
