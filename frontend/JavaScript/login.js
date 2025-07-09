// frontend/JavaScript/login.js
const BASE = import.meta.env.VITE_API_URL;

export async function doLogin(usuario, contrasena) {
  //Para desarrollo la ruta es ${BASE}/api/auth/login`
  //Para produccion es ${BASE}
  // /auth/login`
  // ejemplo en tu login.js
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreUsuario: usuario, contrasena })
  });
  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || 'Error al iniciar sesión');
  }
  const data = await res.json();
  localStorage.setItem('token', data.token); // Aquí guardas el token solo después de tenerlo
  return data;
}
