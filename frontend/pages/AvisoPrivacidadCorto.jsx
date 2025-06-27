// src/pages/AvisoCorto.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import '../styles/avisoPrivacidad.css';

export default function AvisoCorto() {
  return (
    <div className="aviso-page">
    <>

      <section className="aviso-container">
        <h1>Aviso de Privacidad</h1>
        <p>
          En cumplimiento de la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, 
          le informamos que los datos personales que usted proporciona en el formulario (Nombre, Teléfono, Correo Electrónico y Mensaje) 
          serán utilizados por <strong>Analytics</strong> para atender su solicitud de información sobre nuestros servicios.
        </p>
        <p>
          Sus datos se conservarán de forma segura y únicamente serán compartidos con terceros cuando sea estrictamente necesario para la 
          finalidad antes señalada o cuando la ley lo requiera.
        </p>
        <p>
          Para conocer los detalles completos sobre el tratamiento de sus datos, derechos ARCO y medios para ejercerlos, 
          consulte el <Link to="/avisolargo" className="link-primario">Aviso de Privacidad Completo</Link>.
        </p>
      </section>

    </>
    </div>
  );
}
