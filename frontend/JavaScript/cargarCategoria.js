// frontend/JavaScript/cargarCategoria.js
const BASE = import.meta.env.VITE_API_URL;

// Lee el token del localStorage o donde lo guardes tras login
function getToken() {
  return localStorage.getItem('token');
}

// Listar categorías
export async function getCategorias() {
  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}/api/categorias`, { headers });
  if (!res.ok) throw new Error('Error al cargar categorías, inicie sesion nuevamente');
  return res.json();
}

// Crear nueva
export async function crearCategoria(nombreCategoria, imagen) {
  const res = await fetch(`${BASE}/api/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ nombreCategoria, imagen })
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function editarCategoria(idCategoria, nombreCategoria, imagen) {
  const res = await fetch(`${BASE}/api/categorias/${idCategoria}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ nombreCategoria, imagen }) // <-- asegúrate que siempre manda imagen (incluso si está vacía)
  });
  if (!res.ok) throw new Error('Error al editar categoría');
  return res.json();
}

// Activar/desactivar
export async function cambiarEstatusCategoria(idCategoria, estatus) {
  const res = await fetch(`${BASE}/api/categorias/${idCategoria}/estatus`, {
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

// Eliminar categoría (corregida para enviar el token)
export async function eliminarCategoria(idCategoria) {
  const res = await fetch(`${BASE}/api/categorias/${idCategoria}`, {
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
