// src/context/ServiciosContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getServicios } from "../JavaScript/cargarServicio";

const ServiciosContext = createContext();

export function useServicios() {
  return useContext(ServiciosContext);
}

export function ServiciosProvider({ children }) {
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  useEffect(() => {
    setLoadingServicios(true);
    // Llamamos una sola vez sin filtro para traer *todos* los servicios
    getServicios()
      .then(data =>
        setServicios((data || []).filter((s) => s.estatus === 1))
      )
      .catch(() => setServicios([]))
      .finally(() => setLoadingServicios(false));
  }, []);

  return (
    <ServiciosContext.Provider value={{ servicios, loadingServicios }}>
      {children}
    </ServiciosContext.Provider>
  );
}
