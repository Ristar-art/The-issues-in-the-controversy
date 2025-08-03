// src/routes/sitemap.xml/+server.js
export async function GET() {
    const baseUrl = 'https://the-issues-in-the-controversy.vercel.app/'; // Replace with your actual domain
    
    // Define your site's pages
    const pages = [
        {
            url: '/',
            changefreq: 'weekly',
            priority: '1.0',
            lastmod: new Date().toISOString().split('T')[0] // Today's date
        },
        {
            url: '/the-issue',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/gods-solution',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/our-part',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/daniel-overview',
            changefreq: 'monthly',
            priority: '0.9',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/revelation-overview',
            changefreq: 'monthly',
            priority: '0.9',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/character-of-god',
            changefreq: 'monthly',
            priority: '0.9',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/gospel-kingdom',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/prophetic-symbols',
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/government-types',
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/about',
            changefreq: 'yearly',
            priority: '0.6',
            lastmod: new Date().toISOString().split('T')[0]
        },
        {
            url: '/contact',
            changefreq: 'yearly',
            priority: '0.5',
            lastmod: new Date().toISOString().split('T')[0]
        }
    ];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600' // Cache for 1 hour
        }
    });
}

// Optional: If you want to generate this dynamically based on your file system
// You can use this alternative approach:

/*
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    const baseUrl = 'https://yoursite.com';
    
    try {
        // Dynamically find all routes in your src/routes directory
        const routesDir = join(process.cwd(), 'src/routes');
        const routes = await getRoutes(routesDir);
        
        const sitemap = generateSitemap(baseUrl, routes);
        
        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'max-age=3600'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
}

async function getRoutes(dir, routes = [], basePath = '') {
    const files = await readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
        if (file.isDirectory() && !file.name.startsWith('[') && !file.name.startsWith('(')) {
            const newPath = basePath + '/' + file.name;
            routes.push(newPath);
            await getRoutes(join(dir, file.name), routes, newPath);
        }
    }
    
    return routes;
}

function generateSitemap(baseUrl, routes) {
    const pages = routes.map(route => ({
        url: route === '' ? '/' : route,
        changefreq: 'monthly',
        priority: route === '/' ? '1.0' : '0.8',
        lastmod: new Date().toISOString().split('T')[0]
    }));
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
</urlset>`;
}
*/