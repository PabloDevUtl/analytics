import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';           
import ServiciosAdmin from './pages/ServiciosAdmin';
import CategoriasAdmin from './pages/CategoriasAdmin';
import QuienesSomosPage from './pages/QuienesSomosPage';
import ContactanosPage from './pages/ContactanosPage';
import Login from './pages/Login';
//Avisos de privacidad
import AvisoCorto from './pages/AvisoPrivacidadCorto';
import AvisoLargo from './pages/AvisoPrivacidadLargo';

export default function App() {
  const location = useLocation();
  const hideNavFooter = [ '/home-admin', '/servicios-admin','/categorias-admin'].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideNavFooter && <NavigationBar />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-admin" element={<HomeAdmin />} /> 
          <Route path="/servicios-admin" element={<ServiciosAdmin />} />
          <Route path="/categorias-admin" element={<CategoriasAdmin />} />  
          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/contacto" element={<ContactanosPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/avisocorto" element={<AvisoCorto />} />
          <Route path="/avisolargo" element={<AvisoLargo />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
}
