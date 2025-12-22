// api/auth.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export async function fetchSession() {
  const res = await fetch(API_URL + "/users/me", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
}

export async function login(payload: { email: string; password: string }) {
  const res = await fetch(API_URL + "/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}

export async function logout() {
  const res = await fetch(API_URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return res.json();
}
