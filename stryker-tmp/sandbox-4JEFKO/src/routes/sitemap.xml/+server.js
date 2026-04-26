// @ts-nocheck
// src/routes/sitemap.xml/+server.js
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export async function GET() {
  if (stryMutAct_9fa48("1016")) {
    {}
  } else {
    stryCov_9fa48("1016");
    const baseUrl = stryMutAct_9fa48("1017") ? "" : (stryCov_9fa48("1017"), 'https://the-issues-in-the-controversy.vercel.app/'); // Replace with your actual domain

    // Define your site's pages
    const pages = stryMutAct_9fa48("1018") ? [] : (stryCov_9fa48("1018"), [stryMutAct_9fa48("1019") ? {} : (stryCov_9fa48("1019"), {
      url: stryMutAct_9fa48("1020") ? "" : (stryCov_9fa48("1020"), '/'),
      changefreq: stryMutAct_9fa48("1021") ? "" : (stryCov_9fa48("1021"), 'weekly'),
      priority: stryMutAct_9fa48("1022") ? "" : (stryCov_9fa48("1022"), '1.0'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1023") ? "" : (stryCov_9fa48("1023"), 'T'))[0] // Today's date
    }), stryMutAct_9fa48("1024") ? {} : (stryCov_9fa48("1024"), {
      url: stryMutAct_9fa48("1025") ? "" : (stryCov_9fa48("1025"), '/the-issue'),
      changefreq: stryMutAct_9fa48("1026") ? "" : (stryCov_9fa48("1026"), 'monthly'),
      priority: stryMutAct_9fa48("1027") ? "" : (stryCov_9fa48("1027"), '0.8'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1028") ? "" : (stryCov_9fa48("1028"), 'T'))[0]
    }), stryMutAct_9fa48("1029") ? {} : (stryCov_9fa48("1029"), {
      url: stryMutAct_9fa48("1030") ? "" : (stryCov_9fa48("1030"), '/gods-solution'),
      changefreq: stryMutAct_9fa48("1031") ? "" : (stryCov_9fa48("1031"), 'monthly'),
      priority: stryMutAct_9fa48("1032") ? "" : (stryCov_9fa48("1032"), '0.8'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1033") ? "" : (stryCov_9fa48("1033"), 'T'))[0]
    }), stryMutAct_9fa48("1034") ? {} : (stryCov_9fa48("1034"), {
      url: stryMutAct_9fa48("1035") ? "" : (stryCov_9fa48("1035"), '/our-part'),
      changefreq: stryMutAct_9fa48("1036") ? "" : (stryCov_9fa48("1036"), 'monthly'),
      priority: stryMutAct_9fa48("1037") ? "" : (stryCov_9fa48("1037"), '0.8'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1038") ? "" : (stryCov_9fa48("1038"), 'T'))[0]
    }), stryMutAct_9fa48("1039") ? {} : (stryCov_9fa48("1039"), {
      url: stryMutAct_9fa48("1040") ? "" : (stryCov_9fa48("1040"), '/daniel-overview'),
      changefreq: stryMutAct_9fa48("1041") ? "" : (stryCov_9fa48("1041"), 'monthly'),
      priority: stryMutAct_9fa48("1042") ? "" : (stryCov_9fa48("1042"), '0.9'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1043") ? "" : (stryCov_9fa48("1043"), 'T'))[0]
    }), stryMutAct_9fa48("1044") ? {} : (stryCov_9fa48("1044"), {
      url: stryMutAct_9fa48("1045") ? "" : (stryCov_9fa48("1045"), '/revelation-overview'),
      changefreq: stryMutAct_9fa48("1046") ? "" : (stryCov_9fa48("1046"), 'monthly'),
      priority: stryMutAct_9fa48("1047") ? "" : (stryCov_9fa48("1047"), '0.9'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1048") ? "" : (stryCov_9fa48("1048"), 'T'))[0]
    }), stryMutAct_9fa48("1049") ? {} : (stryCov_9fa48("1049"), {
      url: stryMutAct_9fa48("1050") ? "" : (stryCov_9fa48("1050"), '/character-of-god'),
      changefreq: stryMutAct_9fa48("1051") ? "" : (stryCov_9fa48("1051"), 'monthly'),
      priority: stryMutAct_9fa48("1052") ? "" : (stryCov_9fa48("1052"), '0.9'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1053") ? "" : (stryCov_9fa48("1053"), 'T'))[0]
    }), stryMutAct_9fa48("1054") ? {} : (stryCov_9fa48("1054"), {
      url: stryMutAct_9fa48("1055") ? "" : (stryCov_9fa48("1055"), '/gospel-kingdom'),
      changefreq: stryMutAct_9fa48("1056") ? "" : (stryCov_9fa48("1056"), 'monthly'),
      priority: stryMutAct_9fa48("1057") ? "" : (stryCov_9fa48("1057"), '0.8'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1058") ? "" : (stryCov_9fa48("1058"), 'T'))[0]
    }), stryMutAct_9fa48("1059") ? {} : (stryCov_9fa48("1059"), {
      url: stryMutAct_9fa48("1060") ? "" : (stryCov_9fa48("1060"), '/prophetic-symbols'),
      changefreq: stryMutAct_9fa48("1061") ? "" : (stryCov_9fa48("1061"), 'monthly'),
      priority: stryMutAct_9fa48("1062") ? "" : (stryCov_9fa48("1062"), '0.7'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1063") ? "" : (stryCov_9fa48("1063"), 'T'))[0]
    }), stryMutAct_9fa48("1064") ? {} : (stryCov_9fa48("1064"), {
      url: stryMutAct_9fa48("1065") ? "" : (stryCov_9fa48("1065"), '/government-types'),
      changefreq: stryMutAct_9fa48("1066") ? "" : (stryCov_9fa48("1066"), 'monthly'),
      priority: stryMutAct_9fa48("1067") ? "" : (stryCov_9fa48("1067"), '0.7'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1068") ? "" : (stryCov_9fa48("1068"), 'T'))[0]
    }), stryMutAct_9fa48("1069") ? {} : (stryCov_9fa48("1069"), {
      url: stryMutAct_9fa48("1070") ? "" : (stryCov_9fa48("1070"), '/about'),
      changefreq: stryMutAct_9fa48("1071") ? "" : (stryCov_9fa48("1071"), 'yearly'),
      priority: stryMutAct_9fa48("1072") ? "" : (stryCov_9fa48("1072"), '0.6'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1073") ? "" : (stryCov_9fa48("1073"), 'T'))[0]
    }), stryMutAct_9fa48("1074") ? {} : (stryCov_9fa48("1074"), {
      url: stryMutAct_9fa48("1075") ? "" : (stryCov_9fa48("1075"), '/contact'),
      changefreq: stryMutAct_9fa48("1076") ? "" : (stryCov_9fa48("1076"), 'yearly'),
      priority: stryMutAct_9fa48("1077") ? "" : (stryCov_9fa48("1077"), '0.5'),
      lastmod: new Date().toISOString().split(stryMutAct_9fa48("1078") ? "" : (stryCov_9fa48("1078"), 'T'))[0]
    })]);

    // Generate XML sitemap
    const sitemap = stryMutAct_9fa48("1079") ? `` : (stryCov_9fa48("1079"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(stryMutAct_9fa48("1080") ? () => undefined : (stryCov_9fa48("1080"), page => stryMutAct_9fa48("1081") ? `` : (stryCov_9fa48("1081"), `    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`))).join(stryMutAct_9fa48("1082") ? "" : (stryCov_9fa48("1082"), '\n'))}
</urlset>`);
    return new Response(sitemap, stryMutAct_9fa48("1083") ? {} : (stryCov_9fa48("1083"), {
      headers: stryMutAct_9fa48("1084") ? {} : (stryCov_9fa48("1084"), {
        'Content-Type': stryMutAct_9fa48("1085") ? "" : (stryCov_9fa48("1085"), 'application/xml'),
        'Cache-Control': stryMutAct_9fa48("1086") ? "" : (stryCov_9fa48("1086"), 'max-age=3600') // Cache for 1 hour
      })
    }));
  }
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