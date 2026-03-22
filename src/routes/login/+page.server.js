import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  // If already logged in, redirect to admin
  if (locals.user) {
    throw redirect(302, '/admin');
  }
}
