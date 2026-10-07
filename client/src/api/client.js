// Small wrapper around fetch for our Express API.
// - prefixes VITE_API_URL
// - sends/parses JSON
// - attaches the login token when we have one
// - throws an Error with the server's message when the request fails

const BASE_URL = import.meta.env.VITE_API_URL || '';
export const TOKEN_KEY = 'authToken';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function apiFetch(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = auth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error = new Error((data && data.message) || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}
