import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import servicio1 from '../assets/servicio1.png'
import servicio2 from '../assets/servicio2.png'
import '../styles/Servicios.css'

export default function Servicios() {
  const refSection = useRef(null)

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

    // observa título y cada card
    const elems = refSection.current.querySelectorAll(
      '.servicios-title, .servicio-card'
    )
    elems.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className="servicios-section" ref={refSection}>
      <h2 className="servicios-title">Servicios de alta calidad</h2>

      <div className="servicios-container">
        <div className="servicio-card" style={{ '--delay': '0.3s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicio1})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Infraestrutura
                <br />
                de redes
              </h3>
              <span className="underline" />
              <Link to="/servicios-page" className="servicio-button">
                Ver más
              </Link>
            </div>
          </div>
        </div>

        <div className="servicio-card" style={{ '--delay': '0.6s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicio2})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Sistemas de
                <br />
                seguridad
              </h3>
              <span className="underline" />
              <Link to="/servicios-page" className="servicio-button">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
