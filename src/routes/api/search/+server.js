import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesFilePath = path.join(__dirname, '../../../lib/data/pages.json');
const componentsFilePath = path.join(__dirname, '../../../lib/data/components.json');

function readPages() {
  try {
    const data = fs.readFileSync(pagesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function readComponents() {
  try {
    const data = fs.readFileSync(componentsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function getPageContent(page) {
  if (!page.attributes.componentIds || page.attributes.componentIds.length === 0) {
    return page.attributes.content || '';
  }

  const components = readComponents();
  const pageComponents = components.filter(component =>
    page.attributes.componentIds.includes(component.id)
  );

  // Extract text from component blocks
  const componentTexts = pageComponents.map(component => {
    if (component.section && component.section.blocks) {
      return component.section.blocks
        .filter(block => block.text)
        .map(block => block.text)
        .join(' ');
    }
    return '';
  });

  return componentTexts.join(' ');
}

export async function GET({ url }) {
  const query = url.searchParams.get('q'); // Get search term from ?q=...

  if (!query) {
    return json({ error: 'Search query is required' }, { status: 400 });
  }

  const searchTerm = query.toLowerCase();
  let results = [];

   // Search local pages
   try {
     const pages = readPages();
     const matchingPages = pages.filter(page => {
       if (!page.attributes.published) return false;

       const titleMatch = page.attributes.title.toLowerCase().includes(searchTerm);
       const contentMatch = (page.attributes.content || '').toLowerCase().includes(searchTerm);
       const componentContentMatch = getPageContent(page).toLowerCase().includes(searchTerm);

       return titleMatch || contentMatch || componentContentMatch;
     }).map(page => ({
       id: page.id,
       type: 'page',
       attributes: {
         title: page.attributes.title,
         slug: page.attributes.slug,
         content: getPageContent(page).substring(0, 200) + (getPageContent(page).length > 200 ? '...' : ''), // Include component content in results
         publishedAt: page.attributes.published ? new Date().toISOString() : null
       }
     }));
     results.push(...matchingPages);
   } catch (err) {
     console.error('Error searching local pages:', err);
   }



  return json(results);
}