// src/components/AlertAuto.jsx
import React, { useEffect } from 'react';
import '../styles/Alertas.css';

export default function AlertAuto({ show, message = '', type = 'success', onClose }) {
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [show, onClose]);

  if (!show) return null;

  // type: 'success' | 'error' | 'info'
  return (
    <div className={`alertauto-container alertauto-${type}`}>
      <span className="alertauto-message">{message}</span>
    </div>
  );
}
