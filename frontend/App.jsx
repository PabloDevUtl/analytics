import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { CategoriasProvider } from "./context/CategoriaContext";
import { ServiciosProvider } from "./context/ServiciosContext";

import ScrollToTop from "./components/ScrollToTop";
import IsLoading from "./components/IsLoading";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import ServiciosAdmin from "./pages/ServiciosAdmin";
import CategoriasAdmin from "./pages/CategoriasAdmin";
import UsuarioAdmin from "./pages/UsuarioAdmin";
import SuperAdmin from "./pages/SuperAdmin";
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

  const hideNav = ["/login", "/home-admin", "/servicios-admin", "/categorias-admin", "/usuario-admin", "/super-admin"].includes(pathname);
  const hideFooter = ["/home-admin", "/servicios-admin", "/categorias-admin", "/usuario-admin", "/super-admin"].includes(pathname);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <IsLoading />;

  return (
    <CategoriasProvider>
      <ServiciosProvider>
        <div className="app-container">
          <ScrollToTop />
          {!hideNav && <NavigationBar />}
          <main className="app-main">
            <Routes>
              {/* público */}
              <Route path="/login" element={<Login />} />

              {/* protegido */}
              <Route element={<RequireAuth />}>
                <Route path="/home-admin" element={<HomeAdmin />} />
                <Route path="/servicios-admin" element={<ServiciosAdmin />} />
                <Route path="/categorias-admin" element={<CategoriasAdmin />} />
                <Route path="/usuario-admin" element={<UsuarioAdmin />} />
                <Route path="/super-admin" element={<SuperAdmin />} />
              </Route>

              {/* resto público */}
              <Route path="/" element={<Home />} />
              <Route path="/quienes-somos" element={<QuienesSomosPage />} />
              <Route path="/servicios-page" element={<ServiciosPage />} />
              <Route path="/servicios/:slugCategoria" element={<CategoriaPage />} />
              <Route path="/contacto" element={<ContactanosPage />} />
              <Route path="/avisocorto" element={<AvisoCorto />} />
              <Route path="/avisolargo" element={<AvisoLargo />} />
            </Routes>
          </main>
          {!hideFooter && <Footer />}
        </div>
      </ServiciosProvider>
    </CategoriasProvider>
  );
}
