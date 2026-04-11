import { json, error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';

const pagesRef = adminDb.collection('pages');

export async function GET() {
  try {
    const snapshot = await pagesRef.get();
    const pages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return json(pages);
  } catch (err) {
    console.error('Failed to read pages:', err);
    throw error(500, 'Internal server error');
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      throw error(400, 'Title and slug are required');
    }

    const newPage = {
      attributes: {
        title: body.title,
        slug: body.slug,
        content: body.content ?? '',
        componentIds: body.componentIds || [],
        blocks: body.blocks || [{ type: 'text', text: '' }],
        published: false,
        featuredImage: body.featuredImage || null
      }
    };

    const docRef = await pagesRef.add(newPage);
    return json({ id: docRef.id, ...newPage });
  } catch (err) {
    if (err.status) throw err;
    console.error('Failed to create page:', err);
    throw error(500, 'Internal server error');
  }
}

export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      throw error(400, 'Invalid request body');
    }

    const docRef = pagesRef.doc(String(id));
    const doc = await docRef.get();

    if (!doc.exists) {
      throw error(404, 'Article not found');
    }

    const currentData = doc.data();
    const allowedFields = ['title', 'slug', 'content', 'componentIds', 'published', 'blocks', 'featuredImage'];
    const attributeUpdates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(updates, field)) {
        // featuredImage: null is how the client signals "remove from article
        // (but keep the asset in the gallery)". Persist null directly so the
        // field definitely overwrites whatever was there before.
        attributeUpdates[`attributes.${field}`] =
          field === 'featuredImage' && !updates[field] ? null : updates[field];
      }
    }

    await docRef.update(attributeUpdates);

    const updated = await docRef.get();
    return json({ id: updated.id, ...updated.data() });
  } catch (err) {
    if (err.status) throw err;
    console.error('Failed to update page:', err);
    throw error(500, 'Internal server error');
  }
}

export async function DELETE({ url }) {
  try {
    const id = url.searchParams.get('id');
    if (!id) {
      throw error(400, 'Article ID required');
    }

    const docRef = pagesRef.doc(String(id));
    const doc = await docRef.get();

    if (!doc.exists) {
      throw error(404, 'Article not found');
    }

    await docRef.delete();
    return json({ success: true });
  } catch (err) {
    if (err.status) throw err;
    console.error('Failed to delete page:', err);
    throw error(500, 'Internal server error');
  }
}
