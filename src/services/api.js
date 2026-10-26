const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/** Swap the base URL in .env to connect your backend without changing the UI. */
export async function getCatalog({ signal } = {}) {
  const response = await fetch(baseUrl ? `${baseUrl}/catalog` : '/data/catalog.json', { signal });
  if (!response.ok) throw new Error('We couldn’t load the collection. Please try again.');
  const data = await response.json();
  if (!Array.isArray(data.products) || !Array.isArray(data.categories)) {
    throw new Error('The collection data is unavailable. Please try again later.');
  }
  return data;
}
