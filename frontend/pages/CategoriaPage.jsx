// src/pages/CategoriaPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategorias } from '../context/CategoriaContext';
import { useServicios } from '../context/ServiciosContext';
import IsLoading from '../components/IsLoading';
import '../styles/CategoriaPage.css';
import '../styles/ServiciosPage.css';

// Utilidad para generar slug de categoría
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

export default function CategoriaPage() {
  const { slugCategoria } = useParams();
  const navigate = useNavigate();
  const { categorias, loadingCategorias } = useCategorias();
  const { servicios, loadingServicios } = useServicios();

  // Busca la categoría por slug
  const categoria = categorias.find(
    (c) => slugify(c.nombreCategoria) === slugCategoria
  );

  // Redirige si categoría no existe (después de cargar categorías)
  useEffect(() => {
    if (!loadingCategorias && !categoria) {
      const timer = setTimeout(() => navigate('/servicios-page'), 1800);
      return () => clearTimeout(timer);
    }
  }, [loadingCategorias, categoria, navigate]);

  // Muestra loader global mientras context carga Categorías o Servicios
  if (loadingCategorias || loadingServicios) {
    return <IsLoading />;
  }

  // Si no existe la categoría tras la carga
  if (!categoria) {
    return (
      <div className="categoria-hero">
        <div className="categoria-hero-content">
          <h1>Categoría no encontrada</h1>
          <p>Redireccionando a servicios...</p>
        </div>
      </div>
    );
  }

  // Filtra servicios precargados por id de categoría
  const serviciosCat = servicios.filter(
    (s) => s.idCategoria === categoria.idCategoria
  );

  return (
    <>
      {/* HERO */}
      <div className="categoria-hero">
        {categoria.imagen && (
          <div
            className="categoria-hero-bg"
            style={{ backgroundImage: `url(${categoria.imagen})` }}
          />
        )}
        <div className="categoria-hero-overlay" />
        <div className="categoria-hero-content">
          <h1 className="categoria-hero-title">
            {categoria.nombreCategoria}
          </h1>
        </div>
      </div>

      {/* Servicios Relacionados */}
      <section className="categoria-servicios-section">
        {serviciosCat.length === 0 ? (
          <div className="categoria-servicios-nodata">
            No hay servicios disponibles para esta categoría.
          </div>
        ) : (
          serviciosCat.map((serv, idx) => (
            <div
              key={serv.idServicio}
              className={`servicio-alterno-container ${
                idx % 2 === 0 ? 'white-bg img-left' : 'gray-bg img-right'
              }`}
              style={{ '--idx': idx }}
            >
              <div className="servicio-alterno-img">
                {serv.imagen ? (
                  <img src={serv.imagen} alt={serv.titulo} />
                ) : (
                  <div className="servicio-alterno-img-placeholder">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="servicio-alterno-content">
                <h2 className="servicio-alterno-title">{serv.titulo}</h2>
                {serv.subtitulo && (
                  <h3 className="servicio-alterno-sub">{serv.subtitulo}</h3>
                )}
                <p className="servicio-alterno-text">{serv.texto}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
