// @ts-nocheck
import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';

function getComponentContent(component) {
  if (component.section && component.section.blocks) {
    return component.section.blocks
      .filter(block => block.text)
      .map(block => block.text)
      .join(' ');
  }
  return '';
}

export async function GET({ url }) {
  const query = url.searchParams.get('q');

  if (!query) {
    return json({ error: 'Search query is required' }, { status: 400 });
  }

  const searchTerm = query.toLowerCase();

  try {
    // Fetch all published pages
    const pagesSnapshot = await adminDb.collection('pages').get();
    const pages = pagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch all components for content matching
    const componentsSnapshot = await adminDb.collection('components').get();
    const components = componentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const results = pages.filter(page => {
      if (!page.attributes.published) return false;

      const titleMatch = (page.attributes.title || '').toLowerCase().includes(searchTerm);
      const contentMatch = (page.attributes.content || '').toLowerCase().includes(searchTerm);

      // Check component content
      let componentContentMatch = false;
      if (page.attributes.componentIds && page.attributes.componentIds.length > 0) {
        const pageComponents = components.filter(c =>
          page.attributes.componentIds.includes(c.id)
        );
        const componentText = pageComponents.map(c => getComponentContent(c)).join(' ');
        componentContentMatch = componentText.toLowerCase().includes(searchTerm);
      }

      return titleMatch || contentMatch || componentContentMatch;
    }).map(page => {
      const componentText = (page.attributes.componentIds || [])
        .map(id => components.find(c => c.id === id))
        .filter(Boolean)
        .map(c => getComponentContent(c))
        .join(' ');
      const fullContent = (page.attributes.content || '') + ' ' + componentText;

      return {
        id: page.id,
        type: 'page',
        attributes: {
          title: page.attributes.title,
          slug: page.attributes.slug,
          content: fullContent.substring(0, 200) + (fullContent.length > 200 ? '...' : ''),
          publishedAt: page.attributes.published ? new Date().toISOString() : null
        }
      };
    });

    return json(results);
  } catch (err) {
    console.error('Error searching pages:', err);
    return json({ error: 'Search failed' }, { status: 500 });
  }
}
