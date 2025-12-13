import { error } from '@sveltejs/kit';
import { STRAPI_API_URL, STRAPI_API_TOKEN } from '$env/static/private';

export async function load({ params, fetch }) {
  // Fetch the article from your CMS API using the slug
  const response = await fetch(
    `${STRAPI_API_URL}/api/articles?filters[slug][$eq]=${params.slug}`,
    {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`
      }
    }
  );

  if (!response.ok) {
    throw error(500, 'Failed to fetch article');
  }

  const { data } = await response.json();

  if (data.length === 0) {
    throw error(404, 'Article not found');
  }

  return {
    article: data[0].attributes
  };
}