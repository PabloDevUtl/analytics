// src/pages/AvisoLargo.jsx
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import '../styles/avisoPrivacidad.css';

export default function AvisoLargo() {
  return (
        <div className="aviso-page">

    <>

      <section className="aviso-container">
        <h1>Aviso de Privacidad Completo</h1>

        <h2>1. Responsable del Tratamiento</h2>
        <p>
          Analytics S.A. de C.V., con domicilio en Calle Filemón #309, Col. San Pablo, León, Gto., México, 
          es responsable de recabar, usar y proteger sus datos personales.
        </p>

        <h2>2. Datos Personales Recabados</h2>
        <ul>
          <li>Nombre completo</li>
          <li>Teléfono de contacto</li>
          <li>Correo electrónico</li>
          <li>Mensaje o asunto de la solicitud</li>
        </ul>

        <h2>3. Finalidades</h2>
        <p>
          Utilizaremos sus datos para:
          <ul>
            <li>Atender y dar seguimiento a su solicitud de información.</li>
            <li>Comunicarle promociones, novedades y noticias de nuestros servicios (previo consentimiento).</li>
          </ul>
        </p>

        <h2>4. Transferencias</h2>
        <p>
          Sus datos no serán compartidos con terceros, salvo proveedores que contribuyan a la finalidad descrita o 
          requerimientos legales.
        </p>

        <h2>5. Derechos ARCO</h2>
        <p>
          Usted puede ejercer sus Derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) mediante solicitud 
          escrita al correo <a href="mailto:contacto@analytics.com">contacto@analytics.com</a>.
        </p>

        <h2>6. Medios para Ejercer Derechos</h2>
        <p>
          Envíe un correo con asunto “Derechos ARCO” a <a href="mailto:contacto@analytics.com">contacto@analytics.com</a>, 
          indicando nombre completo y datos a modificar.
        </p>

        <h2>7. Cambios al Aviso</h2>
        <p>
          Este aviso podrá modificarse para cumplir con nuevos requerimientos legales o políticas internas. 
          La fecha de última actualización se muestra a continuación.
        </p>
        <p className="fecha-actualizacion">
          Última actualización: 24 de junio de 2025
        </p>
      </section>

    </>
    </div>
  );
}
