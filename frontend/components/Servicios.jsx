import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Servicios.css'

// Importa el fetch del API
import { getCategorias } from '../JavaScript/cargarCategoria'

export default function Servicios() {
  const refSection = useRef(null)
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  // Animación con IntersectionObserver (igual que antes)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          } else {
            e.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    if (refSection.current) {
      const elems = refSection.current.querySelectorAll(
        '.servicios-title, .servicio-card'
      )
      elems.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [categorias])

  // Carga de categorías dinámicamente desde la API
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getCategorias()
      .then((data) => {
        if (isMounted) {
          // Solo categorías activas (estatus === 1)
          setCategorias((data || []).filter((cat) => cat.estatus === 1))
        }
      })
      .catch(() => setCategorias([]))
      .finally(() => setLoading(false))
    return () => { isMounted = false }
  }, [])

  return (
    <section id="servicios" className="servicios-section" ref={refSection}>
      <h2 className="servicios-title">Servicios de alta calidad</h2>
      <div className="servicios-container">

        {loading && (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.3rem', color: '#aaa', margin: '2.5rem 0' }}>
            Cargando servicios...
          </div>
        )}

        {!loading && categorias.length === 0 && (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.15rem', color: '#aaa', margin: '2.5rem 0' }}>
            No hay servicios disponibles en este momento.
          </div>
        )}

        {!loading && categorias.map((cat, idx) => (
          <div className="servicio-card" key={cat.idCategoria} style={{ '--delay': `${0.2 + (idx % 3) * 0.3}s` }}>
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
                <h3>
                  {cat.nombreCategoria}
                </h3>
                <span className="underline" />
                <Link to="/servicios-page" className="servicio-button">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
