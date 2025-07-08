import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import servicioTI from '../assets/ti.png'
import servicioSistemasSeguridad from '../assets/servicioSG.png'
import servicioEnergias from '../assets/servicioEnergias.png'
import servicioGuardiasSeguridad from '../assets/servicioGuardiasS.png'
import servicioCursos from '../assets/servicioCursos.png'
import servicioDesarrolloWeb from '../assets/servicioWeb.png'
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

       <div className="servicio-card" style={{ '--delay': '0.6s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicioSistemasSeguridad})` }}
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

        <div className="servicio-card" style={{ '--delay': '0.3s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicioTI})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Tecnologías de
                <br />
                la información
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
            style={{ backgroundImage: `url(${servicioEnergias})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Energias e
                <br />
                innovación
              </h3>
              <span className="underline" />
              <Link to="/servicios-page" className="servicio-button">
                Ver más
              </Link>
            </div>
          </div>
          
          
        </div>
        <div className="servicio-card" style={{ '--delay': '0.3s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicioGuardiasSeguridad})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Guardias de
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
        <div className="servicio-card" style={{ '--delay': '0.3s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicioCursos})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Cursos, talleres y
                <br />
                capacitaciones
              </h3>
              <span className="underline" />
              <Link to="/servicios-page" className="servicio-button">
                Ver más
              </Link>
            </div>
          </div>
        </div>

        <div className="servicio-card" style={{ '--delay': '0.3s' }}>
          <div
            className="servicio-image"
            style={{ backgroundImage: `url(${servicioDesarrolloWeb})` }}
          >
            <div className="servicio-overlay" />
            <div className="servicio-content">
              <h3>
                Desarrollo de software,
                <br />
                web y aplicativos
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
