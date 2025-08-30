const BASE_URL = "https://example.com/api";

export async function getJSON(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}
