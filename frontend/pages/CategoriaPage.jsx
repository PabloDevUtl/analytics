import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategorias } from "../context/CategoriaContext";
import { getServicios } from "../JavaScript/cargarServicio"; // <-- importa tu función
import "../styles/CategoriaPage.css";
import "../styles/ServiciosPage.css"; // Estilos nuevos para los servicios

function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CategoriaPage() {
  const { slugCategoria } = useParams();
  const { categorias, loadingCategorias } = useCategorias();
  const navigate = useNavigate();

  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  const categoria = categorias.find(
    (c) => slugify(c.nombreCategoria) === slugCategoria
  );

  // Redirección si no existe la categoría
  useEffect(() => {
    if (!loadingCategorias && !categoria) {
      setTimeout(() => navigate("/servicios-page"), 1800);
    }
  }, [loadingCategorias, categoria, navigate]);

  // Carga los servicios relacionados a la categoría
  useEffect(() => {
    if (categoria?.idCategoria) {
      setLoadingServicios(true);
      getServicios(categoria.idCategoria)
        .then((data) => setServicios((data || []).filter(s => s.estatus === 1)))
        .catch(() => setServicios([]))
        .finally(() => setLoadingServicios(false));
    }
  }, [categoria]);

  // Loading categoría
  if (loadingCategorias) return (
    <div className="categoria-hero">
      <div className="categoria-hero-bg loading"></div>
      <div className="categoria-hero-content">Cargando categoría...</div>
    </div>
  );

  // Categoría no encontrada
  if (!categoria) return (
    <div className="categoria-hero">
      <div className="categoria-hero-content">
        <h1>Categoría no encontrada</h1>
        <p>Redireccionando a servicios...</p>
      </div>
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <div className="categoria-hero">
        {categoria.imagen && (
          <div
            className="categoria-hero-bg"
            style={{
              backgroundImage: `url(${categoria.imagen})`
            }}
          />
        )}
        <div className="categoria-hero-overlay" />
        <div className="categoria-hero-content">
          <h1 className="categoria-hero-title">{categoria.nombreCategoria}</h1>
        </div>
      </div>

      {/* Servicios Relacionados */}
      <section className="categoria-servicios-section">
        {loadingServicios ? (
          <div className="categoria-servicios-loading">Cargando servicios...</div>
        ) : servicios.length === 0 ? (
          <div className="categoria-servicios-nodata">No hay servicios disponibles para esta categoría.</div>
        ) : (
          servicios.map((serv, idx) => (
  <div
    key={serv.idServicio}
    className={`servicio-alterno-container ${idx % 2 === 0 ? 'white-bg' : 'gray-bg'} ${idx % 2 === 0 ? 'img-left' : 'img-right'}`}
    style={{ "--idx": idx }}
  >
    <div className="servicio-alterno-img">
      {serv.imagen ? (
        <img src={serv.imagen} alt={serv.titulo} />
      ) : (
        <div className="servicio-alterno-img-placeholder">Sin imagen</div>
      )}
    </div>
    <div className="servicio-alterno-content">
      <h2 className="servicio-alterno-title">{serv.titulo}</h2>
      {serv.subtitulo && <h3 className="servicio-alterno-sub">{serv.subtitulo}</h3>}
      <p className="servicio-alterno-text">{serv.texto}</p>
    </div>
  </div>
))

        )}
      </section>
    </div>
  );
}
