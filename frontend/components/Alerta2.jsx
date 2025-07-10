import React from 'react';
import '../styles/Alertas.css';

export default function Alerta2({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="alert2-backdrop">
      <div className="alert2-modal">
        <h2 className="alert2-title">{title}</h2>
        <p className="alert2-message">{message}</p>
        <div className="alert2-actions">
          <button className="alert2-btn confirm" onClick={onConfirm}>Sí, eliminar</button>
          <button className="alert2-btn cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
