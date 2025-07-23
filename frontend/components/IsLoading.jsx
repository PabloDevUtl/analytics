// src/components/IsLoading.jsx
import React from 'react';
import '../styles/IsLoading.css';

export default function IsLoading() {
  return (
    <div className="loading-overlay">
      <div className="loader-container">
        <div className="spinner" />
        <div className="loading-text">
          <h1>Analytics</h1>
          <p>Analistas en tecnologías</p>
        </div>
      </div>
    </div>
  );
}