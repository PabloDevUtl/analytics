// src/components/Servicios.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategorias } from '../context/CategoriaContext';
import '../styles/Servicios.css';

// Utilidad para generar el slug de cada categoría
function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Servicios() {
  const refSection = useRef(null);
  const { categorias, loadingCategorias } = useCategorias();

  // IntersectionObserver para animar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (refSection.current) {
      const elems = refSection.current.querySelectorAll(
        '.servicios-title, .servicio-card'
      );
      elems.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [categorias]);

  return (
    <section id="servicios" className="servicios-section" ref={refSection}>
      <h2 className="servicios-title">Servicios de alta calidad</h2>
      <div className="servicios-container">
        {loadingCategorias ? (
          <div className="servicios-loading">
            Cargando servicios...
          </div>
        ) : categorias.length === 0 ? (
          <div className="servicios-empty">
            No hay servicios disponibles en este momento.
          </div>
        ) : (
          categorias.map((cat, idx) => (
            <div
              className="servicio-card"
              key={cat.idCategoria}
              style={{ '--delay': `${0.2 + (idx % 3) * 0.3}s` }}
            >
              <div
                className="servicio-image"
                style={
                  cat.imagen
                    ? { backgroundImage: `url(${cat.imagen})` }
                    : { backgroundColor: '#eeeeee' }
                }
              >
                <div className="servicio-overlay" />
                <div className="servicio-content">
                  <h3>{cat.nombreCategoria}</h3>
                  <span className="underline" />
                  <Link to={`/servicios/${slugify(cat.nombreCategoria)}`} className="servicio-button">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}