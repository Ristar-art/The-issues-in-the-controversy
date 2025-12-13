import { json } from '@sveltejs/kit';
import { STRAPI_API_URL, STRAPI_API_TOKEN } from '$env/static/private';

export async function GET({ url }) {
  const query = url.searchParams.get('q'); // Get search term from ?q=...

  if (!query) {
    return json({ error: 'Search query is required' }, { status: 400 });
  }

  // Use Strapi's built-in filters to search
  const response = await fetch(
    `${STRAPI_API_URL}/api/articles?filters[title][$contains]=${query}`,
    {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
    }
  );

  const { data } = await response.json();
  return json(data);
}