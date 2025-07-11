// frontend/JavaScript/cargarServicio.js
const BASE = import.meta.env.VITE_API_URL;
function getToken() {
  return localStorage.getItem('token');
}

// Listar servicios (opcional: por categoría)
export async function getServicios(idCategoria) {
  let url = `${BASE}/api/servicios`;
  if (idCategoria) url += `?idCategoria=${idCategoria}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Error al cargar servicios');
  return res.json();
}

// Crear nuevo servicio
export async function crearServicio(servicio) {
  const res = await fetch(`${BASE}/api/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(servicio)
  });
  if (!res.ok) throw new Error('Error al crear servicio');
  return res.json();
}

// Editar servicio
export async function editarServicio(idServicio, servicio) {
  const res = await fetch(`${BASE}/api/servicios/${idServicio}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(servicio)
  });
  if (!res.ok) throw new Error('Error al editar servicio');
  return res.json();
}

// Activar/desactivar servicio
export async function cambiarEstatusServicio(idServicio, estatus) {
  const res = await fetch(`${BASE}/api/servicios/${idServicio}/estatus`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ estatus })
  });
  if (!res.ok) throw new Error('Error al cambiar estatus');
  return res.json();
}

// Eliminar servicio
export async function eliminarServicio(idServicio) {
  const res = await fetch(`${BASE}/api/servicios/${idServicio}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || 'No se pudo eliminar');
  }
  return true;
}
