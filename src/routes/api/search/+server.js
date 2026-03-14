import { json } from '@sveltejs/kit';
import pagesData from '$lib/data/pages.json';
import componentsData from '$lib/data/components.json';

function readPages() {
  return pagesData;
}

function readComponents() {
  return componentsData;
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
