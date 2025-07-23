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
        // Pequeño timeout para asegurar que el DOM ya está renderizado
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
      return; // ¡Importante! Salimos aquí para no caer en el scrollTop
    }

    // Si no hay hash, tu lógica de siempre subir al top en ciertas rutas:
    const alwaysScrollTopRoutes = [
      "/",
      "/quienes-somos",
      "/contacto",
      "/avisocorto",
      "/avisolargo",
      "/login",
      "/home-admin",
      "/servicios-admin",
      "/categorias-admin",
    ];

    if (alwaysScrollTopRoutes.includes(pathname)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // si hay otros casos especiales (por ejemplo /servicios?cat=), los dejas aquí
  }, [pathname, hash]);

  return null;
}
