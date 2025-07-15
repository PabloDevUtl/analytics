import React, { createContext, useContext, useEffect, useState } from "react";
import { getCategorias } from "../JavaScript/cargarCategoria";

// Crea el contexto
const CategoriasContext = createContext();

// Hook para consumirlo
export function useCategorias() {
  return useContext(CategoriasContext);
}

// Provider para envolver la app
export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    setLoadingCategorias(true);
    getCategorias()
      .then((cats) => setCategorias((cats || []).filter(c => c.estatus === 1)))
      .catch(() => setCategorias([]))
      .finally(() => setLoadingCategorias(false));
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias, loadingCategorias }}>
      {children}
    </CategoriasContext.Provider>
  );
}
