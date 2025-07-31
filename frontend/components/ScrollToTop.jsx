// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si la URL tiene #algo, hacemos scroll a ese elemento
      const id = decodeURIComponent(hash.replace("#", ""));
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
      return;
    }

    // Rutas donde siempre queremos subir al top
    const alwaysScrollTopRoutes = [
      "/",
      "/quienes-somos",
      "/servicios-page",
      "/contacto",
      "/avisocorto",
      "/avisolargo",
      "/login",
      "/home-admin",
      "/servicios-admin",
      "/categorias-admin",
    ];

    // Si la ruta es una categoría individual (e.g. /servicios/dental)
    const isCategoriaRoute = pathname.startsWith("/servicios/");

    if (alwaysScrollTopRoutes.includes(pathname) || isCategoriaRoute) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
