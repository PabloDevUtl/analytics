// frontend/JavaScript/login.js
const BASE = import.meta.env.VITE_API_URL;

export async function doLogin(usuario, contrasena) {
  // Construye la URL completa al endpoint de login
  const url = `${BASE}/api/auth/login`;

  // Realiza la petición
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreUsuario: usuario, contrasena })
  });

  // Si hubo un error, extrae el mensaje y lanza excepción
  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || 'Error al iniciar sesión');
  }

  // Si todo va bien, parsea la respuesta y guarda el token
  const data = await res.json();
  localStorage.setItem('token', data.token);

  return data;
}
