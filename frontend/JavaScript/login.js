// frontend/JavaScript/login.js
const BASE = import.meta.env.VITE_API_URL

export async function doLogin(usuario, contrasena) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreUsuario: usuario, contrasena })
  })
  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}))
    throw new Error(message || 'Error al iniciar sesión')
  }
  return res.json()
}
