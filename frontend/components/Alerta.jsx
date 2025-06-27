// src/components/Alerta.jsx
import React from 'react';

export default function Alerta({ tipo, mensaje }) {
  // Seleccionamos la clase según el tipo
  const clase = tipo === 'error' ? 'alert-error' : 'alert-exito';
  return <div className={clase}>{mensaje}</div>;
}
