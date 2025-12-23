export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${import.meta.env.VITE_API_URL}${path}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    credentials: "include",
    ...init,
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
