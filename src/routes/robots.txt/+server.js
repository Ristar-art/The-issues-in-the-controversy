// Served from a route rather than /static so the sitemap line follows
// SITE_URL when the site moves to its own domain.
import { SITE_URL } from '$lib/seo';

export function GET() {
	const body = `# robots.txt for The Endgame of Heaven

User-agent: *
Allow: /

# The admin app and its login are behind auth and hold nothing to index.
Disallow: /admin/
Disallow: /login

Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=3600'
		}
	});
}
