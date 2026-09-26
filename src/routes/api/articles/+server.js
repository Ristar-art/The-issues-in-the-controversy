import { json, error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import { normalizeFocus } from '$lib/utils/image-focus';

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
        featuredImage: body.featuredImage || null,
        featuredImageFocus: body.featuredImage ? normalizeFocus(body.featuredImageFocus) : null
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
    const allowedFields = ['title', 'slug', 'content', 'componentIds', 'published', 'blocks', 'featuredImage', 'featuredImageFocus'];
    const attributeUpdates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(updates, field)) {
        // featuredImage: null is how the client signals "remove from article
        // (but keep the asset in the gallery)". Persist null directly so the
        // field definitely overwrites whatever was there before.
        if (field === 'featuredImage') {
          attributeUpdates['attributes.featuredImage'] = updates[field] || null;
        } else if (field === 'featuredImageFocus') {
          // Clamped server-side so a bad payload can never produce an
          // object-position the pages cannot render.
          attributeUpdates['attributes.featuredImageFocus'] =
            updates[field] ? normalizeFocus(updates[field]) : null;
        } else {
          attributeUpdates[`attributes.${field}`] = updates[field];
        }
      }
    }

    // Dropping the image drops its focal point with it, even if the client
    // forgot to say so.
    if (attributeUpdates['attributes.featuredImage'] === null) {
      attributeUpdates['attributes.featuredImageFocus'] = null;
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
