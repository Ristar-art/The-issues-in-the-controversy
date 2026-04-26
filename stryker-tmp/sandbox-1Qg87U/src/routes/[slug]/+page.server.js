// @ts-nocheck
import { error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import { blocksToHtml } from '$lib/utils/blocks-to-html';

export async function load({ params }) {
  // Find page by slug
  const pagesSnapshot = await adminDb
    .collection('pages')
    .where('attributes.slug', '==', params.slug)
    .limit(1)
    .get();

  if (pagesSnapshot.empty) {
    throw error(404, 'Article not found');
  }

  const pageDoc = pagesSnapshot.docs[0];
  const page = { id: pageDoc.id, ...pageDoc.data() };

  if (!page.attributes.published) {
    throw error(404, 'Article not found');
  }

  let content = page.attributes.content;

  // Load components if needed
  let components = [];
  const needsComponents =
    (!content && page.attributes.blocks && page.attributes.blocks.length > 0) ||
    (page.attributes.componentIds && page.attributes.componentIds.length > 0);

  if (needsComponents) {
    const componentsSnapshot = await adminDb.collection('components').get();
    components = componentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // If content is empty, build it from blocks
  if (!content && page.attributes.blocks && page.attributes.blocks.length > 0) {
    content = blocksToHtml(page.attributes.blocks, components);
  }

  // If componentIds exist, assemble content from components instead
  if (page.attributes.componentIds && page.attributes.componentIds.length > 0) {
    const pageComponents = page.attributes.componentIds
      .map(id => components.find(c => c.id === id))
      .filter(Boolean);
    content = pageComponents.map(c => c.html).join('');
  }

  return {
    article: {
      id: page.id,
      ...page.attributes,
      content
    }
  };
}
