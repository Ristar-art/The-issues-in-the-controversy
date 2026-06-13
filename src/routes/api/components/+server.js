import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';

const componentsRef = adminDb.collection('components');
const pagesRef = adminDb.collection('pages');

/**
 * Walk a blocks tree and replace any `component` block referencing
 * `componentId` with a frozen `html` block carrying the component's HTML.
 * Returns the new blocks array and a count of rewrites.
 */
function detachComponentFromBlocks(blocks, componentId, html, name) {
  if (!Array.isArray(blocks)) return { blocks, changed: 0 };
  let changed = 0;
  const next = blocks.map(block => {
    if (!block || typeof block !== 'object') return block;
    if (block.type === 'component' && block.componentId === componentId) {
      changed += 1;
      return {
        type: 'html',
        html: html || block.html || '',
        detachedFrom: { id: componentId, name: name || '' }
      };
    }
    if (Array.isArray(block.blocks)) {
      const inner = detachComponentFromBlocks(block.blocks, componentId, html, name);
      if (inner.changed > 0) {
        changed += inner.changed;
        return { ...block, blocks: inner.blocks };
      }
    }
    return block;
  });
  return { blocks: next, changed };
}

export async function GET() {
  try {
    const snapshot = await componentsRef.get();
    const components = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return json(components);
  } catch (err) {
    console.error('Failed to read components:', err);
    return json({ error: 'Failed to read components' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();

    // Handle single component upsert
    if (body && typeof body === 'object' && !Array.isArray(body) && body.id) {
      const docRef = componentsRef.doc(String(body.id));
      const { id, ...data } = body;
      await docRef.set(data, { merge: true });
      return json({ ok: true });
    }

    // Handle full array update (legacy support)
    if (Array.isArray(body)) {
      const batch = adminDb.batch();
      // Delete all existing
      const existing = await componentsRef.get();
      existing.docs.forEach(doc => batch.delete(doc.ref));
      // Write new ones
      for (const component of body) {
        const { id, ...data } = component;
        const docRef = componentsRef.doc(String(id || componentsRef.doc().id));
        batch.set(docRef, data);
      }
      await batch.commit();
      return json({ ok: true });
    }

    return json({ error: 'Invalid request body' }, { status: 400 });
  } catch (err) {
    console.error('Failed to write component:', err);
    return json({ error: 'Failed to write component' }, { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const body = await request.json();

    if (!body || !body.id) {
      return json({ error: 'Component ID is required' }, { status: 400 });
    }

    const componentId = String(body.id);
    const docRef = componentsRef.doc(componentId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return json({ error: 'Component not found' }, { status: 404 });
    }

    const componentData = doc.data() || {};
    const componentHtml = componentData.html || '';
    const componentName = componentData.name || '';

    // Cascade-detach: rewrite any `component` block in any page that
    // references this component into a frozen `html` block. Article content
    // survives the deletion; the block just stops being a live reference.
    const pagesSnap = await pagesRef.get();
    const batch = adminDb.batch();
    let articlesTouched = 0;
    let blocksDetached = 0;

    pagesSnap.docs.forEach(pageDoc => {
      const data = pageDoc.data() || {};
      const attrs = data.attributes || {};
      const blocks = attrs.blocks;
      if (!Array.isArray(blocks)) return;

      const { blocks: nextBlocks, changed } = detachComponentFromBlocks(
        blocks,
        componentId,
        componentHtml,
        componentName
      );

      if (changed === 0) return;

      articlesTouched += 1;
      blocksDetached += changed;

      const updates = { 'attributes.blocks': nextBlocks };
      if (Array.isArray(attrs.componentIds) && attrs.componentIds.includes(componentId)) {
        updates['attributes.componentIds'] = attrs.componentIds.filter(cid => cid !== componentId);
      }
      batch.update(pageDoc.ref, updates);
    });

    batch.delete(docRef);
    await batch.commit();

    return json({ ok: true, articlesTouched, blocksDetached });
  } catch (err) {
    console.error('Failed to delete component:', err);
    return json({ error: 'Failed to delete component' }, { status: 500 });
  }
}
