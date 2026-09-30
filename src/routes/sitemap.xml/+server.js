// src/routes/sitemap.xml/+server.js
import { SEALS } from '$lib/data/seals.js';
import { SITE_URL } from '$lib/seo';
import { adminDb } from '$lib/firebase/admin';

// Routes that exist as files. Anything listed here must resolve — a sitemap
// full of 404s costs crawl budget and trust, which is how the old list of
// renamed URLs (/daniel-overview, /gods-solution and the rest) hurt us.
const STATIC_PAGES = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/faoundations', changefreq: 'monthly', priority: '0.9' },
    { url: '/overview', changefreq: 'monthly', priority: '0.9' },
    { url: '/overview/daniel', changefreq: 'monthly', priority: '0.9' },
    { url: '/overview/revelation', changefreq: 'monthly', priority: '0.9' },
    { url: '/seals', changefreq: 'monthly', priority: '0.9' },
    { url: '/churches', changefreq: 'monthly', priority: '0.9' },
    { url: '/the-144000', changefreq: 'monthly', priority: '0.9' },
    { url: '/beast', changefreq: 'monthly', priority: '0.9' },
    { url: '/flashbacks', changefreq: 'monthly', priority: '0.9' },
    { url: '/symbols', changefreq: 'monthly', priority: '0.8' },
    { url: '/scene/revelation-4', changefreq: 'monthly', priority: '0.8' },
    { url: '/topics', changefreq: 'weekly', priority: '0.8' },
    { url: '/videos', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'yearly', priority: '0.6' },
    { url: '/contact', changefreq: 'yearly', priority: '0.5' }
];

/**
 * Published articles, read from the same collection /[slug] renders from so
 * the sitemap cannot list a draft or miss a new study.
 */
async function articlePages() {
    try {
        const snapshot = await adminDb
            .collection('pages')
            .where('attributes.published', '==', true)
            .get();

        return snapshot.docs
            .map((doc) => doc.data()?.attributes?.slug)
            .filter(Boolean)
            .map((slug) => ({ url: `/${slug}`, changefreq: 'monthly', priority: '0.7' }));
    } catch (err) {
        // A sitemap missing the articles beats a 500 that loses all of it.
        console.error('sitemap: could not read published pages', err);
        return [];
    }
}

/** @param {string} value */
function escapeXml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
    const lastmod = new Date().toISOString().split('T')[0];

    const pages = [
        ...STATIC_PAGES,
        ...SEALS.map((seal) => ({
            url: `/seals/${seal.id}`,
            changefreq: 'monthly',
            priority: '0.7'
        })),
        ...(await articlePages())
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(
        (page) => `    <url>
        <loc>${escapeXml(SITE_URL + encodeURI(page.url))}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
    )
    .join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600'
        }
    });
}
