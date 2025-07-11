// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  // Define tus rutas que SIEMPRE quieres que suban al top
  const alwaysScrollTopRoutes = [
    "/", 
    "/quienes-somos",
    "/contacto",
    "/avisocorto",
    "/avisolargo",
     "/login",
     "/home-admin",
     "/servicios-admin",
     "/categorias-admin"
  ];

  useEffect(() => {
    // Si la ruta es exactamente alguna de las anteriores
    if (alwaysScrollTopRoutes.includes(pathname)) {
      window.scrollTo(0, 0);
      return;
    }

    // Si es la página de servicios CON categoría (query string)
    if (pathname === "/servicios" && search.includes("cat=")) {
      window.scrollTo(0, 0);
      return;
    }

    // Si quieres que cualquier otra ruta personalizada haga scroll top, agrega aquí más lógica
  }, [pathname, search]);

  return null; // Este componente no renderiza nada
}
