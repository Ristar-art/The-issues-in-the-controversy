import { json } from '@sveltejs/kit';
import { adminAuth } from '$lib/firebase/admin';

export async function POST({ request, cookies }) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return json({ error: 'ID token is required' }, { status: 400 });
    }

    // Verify the token is valid (works with both emulator and production)
    await adminAuth.verifyIdToken(idToken);

    cookies.set('session', idToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    return json({ success: true });
  } catch (err) {
    console.error('Failed to create session:', err);
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }
}

export async function DELETE({ cookies }) {
  cookies.delete('session', { path: '/' });
  return json({ success: true });
}
