// src/components/AlertaSesion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Alertas.css';

export default function AlertaSesion({ show }) {
  const navigate = useNavigate();
  if (!show) return null;

  const handleConfirm = () => {
    // Limpia cualquier estado si hace falta...
    navigate('/login');
  };

  return (
    <div className="alert2-backdrop">
      <div className="alert2-modal">
        <h2 className="alert2-title">Sesión expirada</h2>
        <p className="alert2-message">
          Tu sesión ha caducado. Por favor, inicia sesión nuevamente.
        </p>
        <div className="alert2-actions">
          <button className="alert2-btn confirm" onClick={handleConfirm}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
