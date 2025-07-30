import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AlertaSesion from './AlertaSesion';

export default function RequireAuth() {
  const navigate = useNavigate();

  // Validación síncrona del token
  const token = localStorage.getItem('token');
  let expired = false;
  if (!token) {
    expired = true;
  } else {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        expired = true;
      }
    } catch {
      expired = true;
    }
  }

  // Bloquear retroceso y forzar /login si expiró
  React.useEffect(() => {
    if (!expired) return;
    window.history.replaceState(null, '', '/login');
    const onBack = () => window.history.replaceState(null, '', '/login');
    window.addEventListener('popstate', onBack);
    return () => window.removeEventListener('popstate', onBack);
  }, [expired]);

  if (expired) {
    return (
      <AlertaSesion
        show={true}
        title="Sesión expirada"
        message="Tu sesión ha expirado. Por favor, inicia sesión de nuevo."
        onConfirm={() => {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }}
      />
    );
  }

  return <Outlet />;
}
