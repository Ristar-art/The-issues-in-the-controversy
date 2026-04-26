// @ts-nocheck
import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';

const componentsRef = adminDb.collection('components');

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

    const docRef = componentsRef.doc(String(body.id));
    const doc = await docRef.get();

    if (!doc.exists) {
      return json({ error: 'Component not found' }, { status: 404 });
    }

    await docRef.delete();
    return json({ ok: true });
  } catch (err) {
    console.error('Failed to delete component:', err);
    return json({ error: 'Failed to delete component' }, { status: 500 });
  }
}
