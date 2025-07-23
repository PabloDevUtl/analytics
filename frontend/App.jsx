import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CategoriasProvider } from "./context/CategoriaContext";
import ScrollToTop from "./components/ScrollToTop";
import IsLoading from "./components/IsLoading";

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import ServiciosAdmin from "./pages/ServiciosAdmin";
import CategoriasAdmin from "./pages/CategoriasAdmin";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import ServiciosPage from "./pages/ServiciosPage";
import CategoriaPage from "./pages/CategoriaPage";

import ContactanosPage from "./pages/ContactanosPage";
import Login from "./pages/Login";
import AvisoCorto from "./pages/AvisoPrivacidadCorto";
import AvisoLargo from "./pages/AvisoPrivacidadLargo";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();

  // Rutas en las que NO quieres ver el Navbar:
  const hideNav = [
    "/login",
    "/home-admin",
    "/servicios-admin",
    "/categorias-admin",
  ].includes(pathname);

  // Rutas en las que NO quieres ver el Footer:
  const hideFooter = [
    "/home-admin",
    "/servicios-admin",
    "/categorias-admin",
  ].includes(pathname);

    useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

   // Mientras isLoading === true, renderizamos solo el loader
  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <CategoriasProvider>
      <div className="app-container">
        <ScrollToTop />
        {/* Navbar solo si NO estamos en las rutas de hideNav */}
        {!hideNav && <NavigationBar />}

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/servicios-admin" element={<ServiciosAdmin />} />
            <Route path="/categorias-admin" element={<CategoriasAdmin />} />
            <Route path="/quienes-somos" element={<QuienesSomosPage />} />
            <Route path="/servicios-page" element={<ServiciosPage />} />
            <Route
              path="/servicios/:slugCategoria"
              element={<CategoriaPage />}
            />

            <Route path="/contacto" element={<ContactanosPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/avisocorto" element={<AvisoCorto />} />
            <Route path="/avisolargo" element={<AvisoLargo />} />
          </Routes>
        </main>

        {/* Footer solo si NO estamos en las rutas de hideFooter */}
        {!hideFooter && <Footer />}
      </div>
    </CategoriasProvider>
  );
}
