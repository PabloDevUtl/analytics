// src/pages/ContactanosPage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';         // Para enlazar al Aviso de Privacidad
import emailjs from '@emailjs/browser';          // Librería para enviar correos
import AOS from 'aos';                           // Animate On Scroll
import 'aos/dist/aos.css';                       // Estilos de AOS
import '../styles/ContactanosPage.css';          // Estilos propios de la página
import iconWhatsApp from '../assets/iconWhatsApp.png';
import Alerta from '../components/Alerta';       // Componente para mostrar mensajes de alerta

export default function ContactanosPage() {
  // Estado para los campos del formulario
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: ''
  });

  // Estado para controlar si el usuario aceptó términos
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estado para la alerta (error o éxito)
  const [alerta, setAlerta] = useState(null);

  // Inicializa AOS y hace scroll arriba al cargar
  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    window.scrollTo(0, 0);
  }, []);

  // Auto-oculta la alerta después de 4 segundos
  useEffect(() => {
    if (!alerta) return;
    const timer = setTimeout(() => setAlerta(null), 4000);
    return () => clearTimeout(timer);
  }, [alerta]);

  // Maneja cambios en los inputs de texto
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja cambio en el checkbox de términos
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    if (alerta) setAlerta(null);  // Limpia cualquier alerta anterior
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Validar que se acepten términos
    if (!termsAccepted) {
      setAlerta({
        tipo: 'error',
        mensaje: 'Debes aceptar los términos y condiciones.'
      });
      return;
    }

    // 2) Validar que todos los campos estén llenos
    for (const campo in form) {
      if (form[campo].trim() === '') {
        setAlerta({
          tipo: 'error',
          mensaje: `El campo "${campo}" es obligatorio.`
        });
        return;
      }
    }

    // 3) Preparar datos para EmailJS
    const templateParams = {
      name: form.nombre,
      telefono: form.telefono,
      email: form.correo,
      message: form.mensaje,
      title: 'Nuevo mensaje desde la web'
    };

    // 4) Enviar correo
    emailjs
      .send('service_d4wyshf', 'template_6jze45u', templateParams, 'HY-lh-P-lTpJVRxj5')
      .then(() => {
        // Éxito: mostrar alerta y resetear
        setAlerta({
          tipo: 'exito',
          mensaje: 'El formulario se ha enviado con éxito. ¡Gracias!'
        });
        setForm({ nombre: '', telefono: '', correo: '', mensaje: '' });
        setTermsAccepted(false);
      })
      .catch(() => {
        // Error al enviar
        setAlerta({
          tipo: 'error',
          mensaje: 'Error al enviar el formulario. Intenta de nuevo más tarde.'
        });
      });
  };

  return (
    <>
      {/* Sección de contacto completa */}
      <section className="contacto-section">
        <div className="container-contacto" data-aos="fade-up">
          
          {/* 1) Título */}
          <h2 className="contacto-title">Contáctanos</h2>

          {/* 2) Línea + punto + email clicable */}
          <div className="contacto-info">
            <span className="dot"></span>
            {/* Al hacer click, abre el cliente de correo */}
            <a
              href="mailto:contacto@analytics-mx.com"
              className="email-text"
            >
              contacto@analytics-mx.com
            </a>
          </div>

          {/* 3) Teléfonos */}
          <a  href='tel:+524771208831'  className="contacto-telefonos" data-aos="fade-left" data-aos-delay="150">
            (477) 120 8831
          </a>
          <a href='tel:+524779179276' className="contacto-telefonos" data-aos="fade-left" data-aos-delay="200">
           (477) 9179 276
          </a>

          {/* 4) Redes sociales */}
        <div className="redes-contacto" data-aos="fade-up" data-aos-delay="300">
  <a
    href="https://www.facebook.com/tupagina"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <i className="bi bi-facebook"></i>
  </a>
  <a
    href="https://www.instagram.com/tupagina"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <i className="bi bi-instagram"></i>
  </a>
  <a
    href="https://www.tiktok.com/@tupagina"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    <i className="bi bi-tiktok"></i>
  </a>
</div>


          {/* 5) Formulario */}
          <div className="form-container" data-aos="fade-up" data-aos-delay="350">
            <form className="contacto-form" onSubmit={handleSubmit}>
              
              {/* Campo: Nombre */}
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="form-control"
              />

              {/* Campo: Teléfono */}
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                className="form-control"
              />

              {/* Campo: Correo electrónico */}
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
                className="form-control"
              />

              {/* Campo: Mensaje */}
              <textarea
                name="mensaje"
                rows="4"
                placeholder="Mensaje"
                value={form.mensaje}
                onChange={handleChange}
                className="form-control"
              ></textarea>

              {/* Checkbox de Términos y Condiciones */}
              <div className="terms-container">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <label htmlFor="terms">
                  Acepto los&nbsp;
                  <Link to="/avisocorto">términos y condiciones</Link>
                </label>
              </div>

              {/* Botón de envío */}
              <button type="submit" className="btn-enviar">
                ENVIAR
              </button>
            </form>

            {/* Mostrar alerta si existe */}
            {alerta && (
              <div className="alerta-estilo">
                <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Icono fijo de WhatsApp */}
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
