// @ts-nocheck
import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';

export async function GET() {
  try {
    const doc = await adminDb.collection('landing').doc('config').get();

    if (!doc.exists) {
      return json({ error: 'Landing data not found' }, { status: 404 });
    }

    return json(doc.data());
  } catch (err) {
    console.error('Failed to load landing data:', err);
    return json({ error: 'Failed to load landing data' }, { status: 500 });
  }
}
