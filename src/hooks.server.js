import { adminAuth } from '$lib/firebase/admin';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const session = event.cookies.get('session');

  if (session) {
    try {
      const decoded = await adminAuth.verifyIdToken(session);
      event.locals.user = {
        uid: decoded.uid,
        email: decoded.email
      };
    } catch {
      // Invalid or expired token — clear the cookie
      event.cookies.delete('session', { path: '/' });
    }
  }

  return resolve(event);
}
